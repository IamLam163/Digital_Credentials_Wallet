import express from "express";
import cors from "cors";
import {
  createFolder,
  updateFolderName,
  getFolderById,
  getAllFolders,
  getUserFolder,
} from "../controllers/folderController.js";

const folderRouter = express.Router();

folderRouter.use(
  cors({
    credentials: true,
    // origin: "https://digital-wallet.onrender.com" || "http://localhost:3000",
    origin: ["https://digital-credentials-wallet.vercel.app", "http://localhost:3000"],
    // origin: 'http://localhost:3000' || 'https://digital-credentials-wallet-git-latest-iamlam163.vercel.app'
  }),
);

folderRouter.get("/all", getAllFolders);
folderRouter.post("/add", createFolder);
folderRouter.put("/rename/:id", updateFolderName);
folderRouter.get("/folderId/:id", getFolderById);
folderRouter.get("/user/:id", getUserFolder);

export default folderRouter;
