import mongoose from "mongoose";
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;


const folderSchema = new Schema({
  name: { type: String, required: true },
  parentId: { type: ObjectId, ref: 'Folder' },
  owner: { type: ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now() },
  //path: { type: String, required: true },
});

const folderModel = model('Folder', folderSchema);

export default folderModel;
