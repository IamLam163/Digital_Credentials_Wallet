import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';


export const test = (req, res) => {
  res.json('test is working');
};

// Logic to register a User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: 'name is required!'
      })
    };
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be at least 6 characters long!'
      })
    };
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
    })
    return res.json({ user })
  } catch (error) {
    console.log(error.toString());
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No User Found!'
      });
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
