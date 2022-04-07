/**
 * @file Declares API for messages related data access object methods
 */
import Message from "../../models/messages/Message"

export default interface MessageDao {
    userSendsMsg(fromuid: string, touid: string, msg: string): Promise<any>;
    userDelsMsg(mid: string): Promise<any>;
    findSentMsg(uid: string): Promise<Message[]>;
    findRecMsg(uid: string): Promise<Message[]>;
}

