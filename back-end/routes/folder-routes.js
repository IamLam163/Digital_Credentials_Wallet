import express from 'express';
import cors from 'cors';
import { createFolder, updateFolderName, getFolderById, getAllFolders, getUserFolder } from '../controllers/folderController.js';


const folderRouter = express.Router()

folderRouter.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000' || 'https://digital-wallet.onrender.com'
  })
)

folderRouter.get('/all', getAllFolders);
folderRouter.post('/add', createFolder);
folderRouter.put('/rename/:id', updateFolderName);
folderRouter.get('/folderId/:id', getFolderById);
folderRouter.get('/user/:id', getUserFolder);

export default folderRouter;
