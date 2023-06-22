import mongoose from 'mongoose';
import Express from 'express';
import Pdf from '../models/pdf.js';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import config from '../utils/Firebase.js';
import multer from 'multer';
import router from '../routes/authRoutes.js';
import user from '../models/user.js';
import { ObjectId } from 'mongodb';

// const ObjectId = mongoose.Types.ObjectId;
const firebaseConfig = config;
const app = initializeApp(firebaseConfig);
const upload = multer({ storage: multer.memoryStorage()});
// const user_id = await user.findById(owner);

router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(getStorage(app), `files/${req.file.originalname}_${dateTime}`);

    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('file uploaded successfully');

    const pdf = new Pdf({
      file: req.file.mimetype,
      name: req.file.originalname,
      owner: new ObjectId(req.body.owner),
      file: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        downloadURL: downloadURL,
      },
    });

    await pdf.save();
    // res.json({ pdf });

    return res.json({
      pdf: pdf, // Return the saved pdf object
      downloadURL: downloadURL,
      name: req.file.originalname,
      size: snapshot.totalBytes,
      type: req.file.mimetype,
    });
  } catch (error) {
    console.log('Error uploading file', error.toString());
    return res.json({ error: error.toString() });
  }
});

router.get('/pdf/:id', async (req, res) => {
    try {
        let pdf = await Pdf.findById(req.params.id);
        console.log(pdf);
    if (!pdf) {
        return res.json({
        error: 'No pdf Found!'
        });
    }
    return res.json({ pdf });
    } catch (error) {
        console.error(error.toString());
        return res.json({ error: error });
    }
});
router.get('/user/pdf/:id', async (req, res) => {
    try {
        let pdf = await Pdf.find({owner: req.params.id});
        // console.log(pdf);
    if (!pdf) {
        return res.json({
        error: 'No pdf Found!'
        });
    }
    return res.json({ pdf });
    } catch (error) {
        console.error(error.toString());
        return res.json({ error: error });
    }
});

router.delete('/delete/pdf/:id', async (req, res) => {
    try {
        let pdf = await Pdf.findByIdAndDelete(req.params.id);
        // console.log(pdf);
    if (!pdf) {
        return res.json({
        error: 'No pdf Found!'
        });
    }
    return res.json({ pdf });
    } catch (error) {
        console.error(error.toString());
        return res.json({ error: error });
    }
});
const giveCurrentDateTime = () => {
  const date = new Date();
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    '-' +
    date.getHours() +
    '-' +
    date.getMinutes() +
    '-' +
    date.getSeconds()
  );
};

export default router;