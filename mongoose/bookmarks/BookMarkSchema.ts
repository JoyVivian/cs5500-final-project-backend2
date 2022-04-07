/**
 * @file Implements mongoose schema.
 */
 import mongoose, {Schema} from "mongoose";
 import BookMark from "../../models/bookmarks/BookMark"
 
 const LikeSchema = new mongoose.Schema<BookMark>({
     tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
     bookMarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
 }, {collection: "likes"});
 export default LikeSchema;