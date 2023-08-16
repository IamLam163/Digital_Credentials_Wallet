import User from "../models/user.js";
import {
  hashPassword,
  comparePassword,
  hashToken,
  compareToken,
  createRandomBytes,
} from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import {
  generateEmailTemplate,
  generateOTP,
  generatePasswordResetTemplate,
  mailTransport,
  plainEmailTemplate,
  resetSuccessfulTemplate,
} from "../helpers/email.js";
import verificationToken from "../models/verificationToken.js";
import { isValidObjectId } from "mongoose";
import resetToken from "../models/resetToken.js";

export const test = (req, res) => {
  res.json("test is working");
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.json({
        error: "No Users Found!",
      });
    }
    return res.json({ users });
  } catch (error) {
    console.log(error.toString());
  }
};

// Logic to register a User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is a required field! Please enter your name",
      });
    }
    if (!password) {
      return res.json({
        error: "Password is a required field! Please input your password",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is a required field! Please input your email",
      });
    }
    if (password.length < 6) {
      return res.json({
        error: "Password should be at least 6 characters long!",
      });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        error: "User exists! Login Instead",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const OTP = generateOTP();
    const hashedToken = await hashToken(OTP);

    const verifyToken = new verificationToken({
      owner: user._id,
      token: hashedToken,
    });
    await verifyToken.save();

    const userId = user._id;

    mailTransport().sendMail({
      from: "digitalcredentialswallet@email.com",
      to: user.email,
      subject: "Quick Action: Verify your email address",
      html: generateEmailTemplate(OTP),
    });

    return res.json({ userId });
  } catch (error) {
    console.log(error.toString());
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: "Email field cannot be empty! Please input a valid email",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User Found!",
      });
    }
    if (!password) {
      return res.json({
        error: "Password cannot be empty! Please input your password!",
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          // return res.cookie("token", token).json(user);
          return res.status(200).json({
            success: true,
            user: {
              id: user._id,
              email: user.email,
              name: user.name,
            },
            token: token,
          });
        },
      );
    } else {
      return res.json({
        error: "Incorrect Password. Try Again!",
      });
    }
  } catch (error) {
    console.log(error.toString());
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    message: "Logged Out Successfully!",
  });
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.json({
      error: "No User Found!",
    });
  }
  if (user.verified) {
    return res.json({
      error: "This account is already verified!",
    });
  }
  if (!otp) {
    return res.json({
      error: "Please Input your OTP!",
    });
  }
  if (!isValidObjectId(userId)) {
    return res.json({
      error: "User not Found! Invalid User ID",
    });
  }
  //checks/validates current token with the token assigned to the user in database
  //current token = validtoken while token in (validtoken.token) is token in database
  //validtoken matches token with a user
  const validtoken = await verificationToken.findOne({ owner: user._id });
  if (!validtoken) {
    return res.json({
      error: "Sorry Token does not Match any Existing User!",
    });
  }
  //compares matched token with hashed token
  const match = await compareToken(otp, validtoken.token);

  //if otp and token don't match, token is Invalid
  if (!match) {
    return res.json({
      error: "Invalid OTP! Please provide a valid OTP",
    });
  }

  //if tokens match verify user and delete the token
  if (match) {
    user.verified = true;
    await verificationToken.findByIdAndDelete(validtoken._id);
    await user.save();
  }
  mailTransport().sendMail({
    from: "digitalcredentialswallet@email.com",
    to: user.email,
    subject: "Quick Action: Verify your email address",
    html: plainEmailTemplate(
      "Email verified Successfully",
      "Thanks for using our Service",
    ),
  });
  res.json({
    success: true,
    message: "Email Successfully Verified!",
    user: { name: user.name, email: user.email, id: user._id },
  });
};
/*
export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'No User Found!' });
    }
    if (user.verified) {
      return res.status(400).json({ error: 'This account is already verified!' });
    }
    if (!otp) {
      return res.status(400).json({ error: 'Please Input your OTP!' });
    }
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ error: 'User not Found! Invalid User ID' });
    }

    const validToken = await verificationToken.findOne({ owner: user._id });
    if (!validToken) {
      return res.status(400).json({ error: 'Sorry, Token does not match any Existing User!' });
    }

    const isTokenValid = await compareToken(otp, validToken.token);
    if (!isTokenValid) {
      return res.status(400).json({ error: 'Invalid OTP! Please provide a valid OTP.' });
    }

    user.verified = true;
    await verificationToken.findByIdAndDelete(validToken._id);
    await user.save();

    mailTransport().sendMail({
      from: 'your-email@example.com',
      to: user.email,
      subject: 'Quick Action: Verify your email address',
      html: plainEmailTemplate('Email verified Successfully', 'Thanks for using our Service'),
    });

    res.status(200).json({
      success: true,
      message: 'Email Successfully Verified!',
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (error) {
    // Handle and log any exceptions or unexpected errors
    console.log(error);
    res.status(500).json({ error: 'An unexpected error occurred during email verification.' });
  }
};

*/

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      error: "Please Provide a Valid Email!",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      error: "No User Found with this email!",
    });
  }
  const findtoken = await resetToken.findOne({ owner: user._id });
  if (findtoken) {
    return res.json({
      error: "You can only generate One token per hour!",
    });
  }
  // create new token
  const token = await createRandomBytes();
  const newresetToken = new resetToken({ owner: user._id, token });
  await newresetToken.save();

  mailTransport().sendMail({
    from: "digitalcredentialswallet@email.com",
    to: user.email,
    subject: "Quick Action: Password Reset",
    html: generatePasswordResetTemplate(
      `http://localhost:3000/reset-password?token=${token}&id=${user._id}`,
    ),
  });

  res.json({
    success: true,
    message: "Password reset link has been sent to your email address.",
  });
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.json({
      error: "User Not Found!",
    });
  }
  const hashedPassword = await hashPassword(password);

  const isSamePassword = await comparePassword(password, user.password);
  if (isSamePassword) {
    return res.json({
      error: "New password cannot be the same!",
    });
  }
  if (password.length < 6) {
    return res.json({
      error: "Password Cannot be less than Six Characters!",
    });
  }
  user.password = hashedPassword;
  await user.save();

  await resetToken.findOneAndDelete({ owner: user._id });

  mailTransport().sendMail({
    from: "digitalcredentialswallet@email.com",
    to: user.email,
    subject: "Password Reset Successful!",
    html: resetSuccessfulTemplate(
      "Password Reset was Successful",
      "You can now Login with New Password!",
    ),
  });

  res.json({
    success: true,
    message: "Your Password reset was Successful",
  });
};

// previously named testProfile
export const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ error: "Authentication required" });
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return res.json(user);
    });
  } else {
    return res.json(null);
  }
};

/*
export const getProfile = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findById(userId);
    if (user) {
      return res.json({ user });
    }
    else {
    return res.json(null);
    }
  }
  catch (error) {
    console.log(error);
    return res.json({ "An error occurred while fetching the user profile" });
  }
};
*/
