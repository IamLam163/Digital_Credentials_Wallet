import User from "../models/user.js";
import { hashPassword, comparePassword, hashToken, compareToken } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';
import { generateEmailTemplate, generateOTP, mailTransport, plainEmailTemplate } from "../helpers/email.js";
import verificationToken from "../models/verificationToken.js";
import { isValidObjectId } from "mongoose";

export const test = (req, res) => {
  res.json('test is working');
};

// Logic to register a User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: 'Name is a required field! Please enter your name'
      })
    };
    if (!password) {
      return res.json({
        error: 'Password is a required field! Please input your password'
      })
    };
    if (!email) {
      return res.json({
        error: 'Email is a required field! Please input your email'
      })
    }
    if (password.length < 6) {
      return res.json({ error: 'Password should be at least 6 characters long!' });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        error: 'User exists! Login Instead'
      })
    };

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const OTP = generateOTP();
    const hashedToken = await hashToken(OTP)

    const verifyToken = new verificationToken({
      owner: user._id,
      token: hashedToken,
    });
    await verifyToken.save();

    mailTransport().sendMail({
      from: 'digitalcredentialswallet@email.com',
      to: user.email,
      subject: 'Quick Action: Verify your email address',
      html: generateEmailTemplate(OTP),
    })

    return res.json({ user })
  } catch (error) {
    console.log(error.toString());
  }
};


export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: 'Email field cannot be empty! Please input a valid email'
      })
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No User Found!'
      });
    }
    if (!password) {
      return res.json({
        error: 'Password cannot be empty! Please input your password!'
      })
    }

    const match = await comparePassword(password, user.password)
    if (match) {
      jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        return res.cookie('token', token).json(user)
      });
    } else {
      return res.json({
        error: 'Incorrect Password. Try Again!'
      });
    }
  } catch (error) {
    console.log(error.toString());
  }
}

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body
  if (!userId || !otp) {
    return res.json({
      error: 'Invalid request! Missing Parameters!'
    });
  }
  if (!isValidObjectId(userId)) {
    return res.json({
      error: 'User not Found! Invalid User ID'
    })
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.json({
      error: 'No User Found!'
    });
  }
  if (user.verified) {
    return res.json({
      error: 'This account is already verified!'
    });
  }

  //checks/validates current token with the token assigned to the user in database
  //current token = validtoken while token in (validtoken.token) is token in database
  //validtoken matches token with a user
  const validtoken = await verificationToken.findOne({ owner: user._id })
  if (!validtoken) {
    return res.json({
      error: 'Sorry Token does not Match any Existing User!'
    })
  }
  //compares matched token with hashed token
  const match = await compareToken(otp, validtoken.token)

  //if otp and token don't match, token is Invalid
  if (!match) {
    return res.json({
      error: 'Invalid OTP! Please provide a valid OTP'
    })
  }

  //if tokens match verify user and delete the token
  if (match) {
    user.verified = true;
    await verificationToken.findByIdAndDelete(validtoken._id);
    await user.save()
  }
  mailTransport().sendMail({
    from: 'digitalcredentialswallet@email.com',
    to: user.email,
    subject: 'Quick Action: Verify your email address',
    html: plainEmailTemplate(
      'Email verified Successfully',
      'Thanks for using our Service'
    ),
  })
  res.json({
    success: true,
    message: 'Email Successfully Verified!',
    user: { name: user.name, email: user.email, id: user._id }
  })

}


export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No user found with this Email!'
      })
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    return res.json({
      message: 'Password reset successful!'
    })
  } catch (error) {
    console.log(error.toString());
    return res.json({
      error: 'An error occured while resetting the password'
    })
  }
}

export const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      return res.json(user);
    });
  } else {
    return res.json(null);
  }
}
