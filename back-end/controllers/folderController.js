import User from '../models/user.js';
import Folder from '../models/folder.js'; // note import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getAllFolders = async (req, res) => {
  let folders;
  try {
    folders = await Folder.find().populate('owner');
  } catch (error) {
    console.log(error.toString())
  }
  if (!folders) {
    return res.json({
      error: 'No Folders Found!'
    })
  }
  return res.json({ folders })
}

export const createFolder = async (req, res) => {
  const { name, parentId, owner } = req.body;
  const user = await User.findById(owner);
  if (!user) {
    return res.json({
      error: 'Folder cannot be created without valid user'
    })
  }
  try {
    const folderData = ({
      name,
      owner: user,
      //path
    })
    if (parentId) {
      folderData.parentId = ObjectId(parentId);
    }
    const folder = new Folder(folderData);
    await folder.save();
    console.log('Folder created Successfully');
    return res.json({ folder })
  } catch (error) {
    console.log('Error creating folder', error.toString())
  }
}

export const updateFolderName = async (req, res) => {
  const { name } = req.body;
  const folderId = req.params.id;

  try {
    let folder = await Folder.findByIdAndUpdate(folderId);
    if (!folder) {
      return res.json({
        error: 'Folder Not Found'
      });
    }
    folder.name = name;
    await folder.save();
    console.log('Folder Renamed Successfully');
    return res.json({ folder })
  } catch (error) {
    console.log(error);
    return res.json({ error: 'Error updating folder name' });
  }


}
