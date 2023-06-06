import User from "../models/user.js";

export const test = (req, res) => {
  res.json('test is working');
};

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

    const user = await User.create({
      name,
      email,
      password,
    })
    return res.json({ user })
  } catch (error) {
    console.log(error.toString());
  }
};
