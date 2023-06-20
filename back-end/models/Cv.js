import mongoose from "mongoose";
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const cvSchema = new Schema({
    name: { type: String, required: true },
    // parentId: { type: ObjectId, ref: 'Cv' },
    owner: { type: ObjectId, ref: 'User', required: false },
    createdAt: { type: Date, default: Date.now() },
    cloudinary_id: { type: String },
    Image: { type: Object, required: true },
})
// cvSchema.methods.remove = async function () {
//     const cv = this;
//     await cv.remove();
// }

const cvModel = model('Cv', cvSchema);
export default cvModel;