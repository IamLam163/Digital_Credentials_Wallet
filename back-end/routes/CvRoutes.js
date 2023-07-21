import cors from 'cors';
import cloudinary from '../utils/cloudinary.js';
// const upload = require('../../utils/multer');
import upload from '../utils/multer.js';
import express from 'express';
import router from './authRoutes.js';
import Cv from '../models/Cv.js';
import { ObjectId } from 'mongodb';
router.post('/cv', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        let cv = new Cv({
            name: req.body.name,
            Image: result,
            owner: new ObjectId(req.body.owner),
            cloudinary_id: result.public_id
        });
        await cv.save();

        res.json(cv); // Send the response after saving the cv object

        console.log('Cv created successfully');
        // console.log(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/cv', async (req, res) => {
    try {
        let cv = await Cv.find();
        res.json(cv);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/cv/:id', async (req, res) => {
try{
  let cv = await Cv.findById(req.params.id);
  console.log(cv)
  if (!cv) {
    return res.status(404).json({ error: 'CV not found' });
  }
  res.json(cv);
} catch(error){
  console.log(error);
  }
});

router.get('/user/cv/:id', async (req, res) => {
  try{
    let cv = await Cv.find({owner: req.params.id});
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    res.json(cv);
  } catch(error){
    console.log(error);
  
  };
});

//delete with user id
router.delete('/user/cv/:id', async (req, res) => {
  try {
    const cv = await Cv.findOneAndDelete({ _id: req.params.id }).lean();

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    await cloudinary.uploader.destroy(cv.cloudinary_id);
    console.log('Image deleted successfully');
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
});


export default router;