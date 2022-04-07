/**
 * @file Declares Message data type representing relationship between 
 * user and user, as in user sends message to other users.
 */
import { Schema } from "mongoose";

/**
 * @typedef Message Represents message relationship between a user and another user.
 * @property {string} message message stored.
 * @property {Schema.Types.ObjectId} fromUser sent user.
 * @property {Schema.Types.ObjectId} toUser received user. 
 */
export default interface Message {
    message: string,
    fromUser: Schema.Types.ObjectId,
    toUser: Schema.Types.ObjectId,
    setOn: Date
};