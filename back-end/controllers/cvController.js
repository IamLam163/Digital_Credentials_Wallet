import User from '../models/user.js';
import Cv from '../models/Cv.js'
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getAllCvs = async (req, res) => {
    let cvs;
    try {
        cvs = await Cv.find({}).exec();
    } catch (error) {
        console.error(error.toString());
        return res.json({ error: error });
    }
    if (!cvs || cvs.length === 0) {
        return res.json({
            error: 'No cvs Found!'
        });
    }
    return res.json({ cvs });
}

export const createCv = async (req, res) => {
    const { name, parentId, owner, image } = req.body;
    const user = await User.findById(owner);
    if (!user) {
        return res.json({
            error: 'Cv cannot be created without a valid user'
        });
    }
    try {
        const cvData = {
            name,
            owner: user_id,
            image
        };
        if (parentId) {
            cvData.parentId = ObjectId(parentId);
        }
        const cv = new Cv(cvData);
        await cv.save();
        console.log('Cv created successfully');
        return res.json({ cv });
    }
    catch (error) {
        console.log('Error creating cv', error.toString());
        return res.json({ error: error.toString() });
    }
}
export const getcvById = async (req, res) => {
    const { cvId } = req.params;
    let cv;
    try {
        cv = await Cv.findById(cvId).exec();
    } catch (error) {
        console.error(error.toString());
        return res.json({ error: error });
    }
    if (!cv) {
        return res.json({
            error: 'No cv Found!'
        });
    }
    return res.json({ cv });
}

export const deleteCvById = async (req, res) => {
    const { cvId } = req.params;
    let cv;
    try {
        cv = await Cv.findOneAndDelete({ _id: cvId });
        console.log('Deleted', Cv);
    } catch (error) {
        console.log(error.toString());
    }
    if (!cv) {
        return res.json({
            error: 'No Cv with this ID Found!'
        })
    }
    return res.json({ success: 'Pdf deleted successfully' });
}
