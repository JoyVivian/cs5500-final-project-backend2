/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/MessageModel"
import Message from "../models/messages/Message"
import MessageDaoI from "../interfaces/messages/MessageDao"

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao.
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() { }

    /**
     * Uses MessageModel to create a record.
     * @param {string} fromuid The user id of the sent user.
     * @param {string} touid The user id of recieved user.
     * @param {string} msg The message sent.
     */
    userSendsMsg = async (fromuid: string, touid: string, msg: string): Promise<any> =>
        MessageModel.create({ fromUser: fromuid, toUser: touid, message: msg});
    
    /**
     * Uses MessageModel to delete a record.
     * @param mid The primary key of the message.
     */
    userDelsMsg = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid });

    /**
     * Uses MessageModel to retrieve sent messages. 
     * @param uid The primary key of the user.
     */
    findSentMsg = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ fromUser: uid });

    /**
     * Uses MessageModel to retrieve received messages.
     * @param uid The primary key of the user.
     */
    findRecMsg = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ toUser: uid });
}