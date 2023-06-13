import User from '../models/user.js';
import Folder from '../models/folder.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getAllFolders = async (req, res) => {
  let folders;
  try {
    folders = await Folder.find().populate('owner');
  } catch (error) {
    console.log(error.toString());
    return res.json({ error: error.toString() });
  }
  if (!folders || folders.length === 0) {
    return res.json({
      error: 'No Folders Found!'
    });
  }
  return res.json({ folders });
};

export const createFolder = async (req, res) => {
  const { name, parentId, owner } = req.body;
  const user = await User.findById(owner);
  if (!user) {
    return res.json({
      error: 'Folder cannot be created without a valid user'
    });
  }
  try {
    const folderData = {
      name,
      owner: user
    };
    if (parentId) {
      folderData.parentId = ObjectId(parentId);
    }
    const folder = new Folder(folderData);
    await folder.save();
    console.log('Folder created successfully');
    return res.json({ folder });
  } catch (error) {
    console.log('Error creating folder', error.toString());
    return res.json({ error: error.toString() });
  }
};

export const updateFolderName = async (req, res) => {
  const { name } = req.body;
  const folderId = req.params.id;

  try {
    let folder = await Folder.findByIdAndUpdate(folderId);
    if (!folder) {
      return res.json({
        error: 'Folder not found'
      });
    }
    folder.name = name;
    await folder.save();
    console.log('Folder renamed successfully');
    return res.json({ folder });
  } catch (error) {
    console.log(error);
    return res.json({ error: 'Error updating folder name' });
  }
};

export const getFolderById = async (req, res) => {
  const folderId = req.params.id;
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.json({
        error: 'Folder not found'
      });
    }
    return res.json({ folder });
  } catch (error) {
    console.log(error);
    return res.json({ error: 'Error getting folder' });
  }
};
