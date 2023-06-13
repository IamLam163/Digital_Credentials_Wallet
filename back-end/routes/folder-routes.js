import express from 'express';
import cors from 'cors';
import { createFolder, updateFolderName } from '../controllers/folderController.js';


const folderRouter = express.Router()

folderRouter.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)

folderRouter.post('/add', createFolder);
folderRouter.put('/rename/:id', updateFolderName);


export default folderRouter;
