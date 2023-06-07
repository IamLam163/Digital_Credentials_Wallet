import User from "../models/user.js";
import { hashPassword, comparePassword, hashToken } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';
import { generateOTP } from "../helpers/email.js";
import verificationToken from "../models/verificationToken.js";

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
