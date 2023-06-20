import mongoose from "mongoose";
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const pdfSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: ObjectId, ref: 'User', required: false },
  createdAt: { type: Date, default: Date.now() },
  file: {
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
  },
});

const pdfModel = model('Pdf', pdfSchema);
export default pdfModel;
