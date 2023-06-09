import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  verified: { type: Boolean, default: false, required: true }
});

const userModel = model('User', userSchema);

export default userModel;
