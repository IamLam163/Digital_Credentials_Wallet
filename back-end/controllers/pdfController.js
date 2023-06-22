import mongoose from 'mongoose';
import Express from 'express';
import Pdf from '../models/pdf.js';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import config from '../utils/Firebase.js';
import multer from 'multer';
import router from '../routes/authRoutes.js';
import User from '../models/user.js';

const ObjectId = mongoose.Types.ObjectId;
export const createCv = async (req, res) => {
  const { name, parentId, owner, file } = req.body;
  const user = await User.findById(owner);
  if (!user) {
    return res.json({
      error: 'Pdf cannot be created without a valid user'
    });
  }
  try {
    const pdfData = {
      name,
      owner,
      file,

    };
    if (parentId) {
      pdfData.parentId = ObjectId(parentId);
    }
    const pdf = new Pdf(pdfData);
    await pdf.save();
    console.log('Pdf created successfully');
    return res.json({ pdf });
  }
  catch (error) {
    console.log('Error creating pdf', error.toString());
    return res.json({ error: error.toString() });
  }
};
export const getPdfById = async (req, res) => {
  const { pdfId } = req.params;
  let pdf;
  try {
    pdf = await Pdf.findById(pdfId).exec();
  } catch (error) {
    console.error(error.toString());
    return res.json({ error: error });
  }
  if (!pdf) {
    return res.json({
      error: 'No pdf Found!'
    });
  }
  return res.json({ pdf });
}
export const deletePdfById = async (req, res) => {
  const { pdfId } = req.params
  let pdf;
  try {
    pdf = await Pdf.findOneAndDelete({ _id: pdfId });
    console.log('Deleted', pdf);
  } catch (error) {
    console.log(error.toString());
  }
  if (!pdf) {
    return res.json({
      error: 'No pdf with this ID Found',
    })
  }
  return res.json({ success: 'Pdf deleted successfully' });
}

export default router;
