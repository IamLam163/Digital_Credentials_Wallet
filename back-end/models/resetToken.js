import mongoose from "mongoose";
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const resetTokenSchema = new Schema({
  owner: { type: ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, expires: 3600, default: Date.now() },
});

const resetToken = model('resetToken', resetTokenSchema);

export default resetToken;
