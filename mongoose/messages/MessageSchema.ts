/**
 * @file Implements mongoose schema.
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message"

const MessageSchema = new mongoose.Schema<Message> ({
    message: String,
    fromUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
    toUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
    setOn: {type: Date, default: Date.now}
}, {collection: "messages"});

export default MessageSchema;