/**
 * @file Controller RESTful Web Service API for messages resource.
 */
import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao"
import MessageControllerI from "../interfaces/messages/MessageController"

/**
 * @class MessageController Implements RESTful Web Service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li>POST /api/users/:fromuid/messages/:touid to create a message record.</li>
 *  <li>DELETE /api/messages/:mid to delete a message.</li>
 *  <li>GET /api/users/:uid/sends to retrieve sent messages.</li>
 *  <li>GET /api/users/:uid/recvs to retrieve received messages.</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations.
 * @property {MessageController} messageController Singleton controller implementing RESTful Web
 * Service API.
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Create singleton controller instance.
     * @param app Express instance to declare the RESTful Web Service API.
     * @returns MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            
            app.post("/api/users/:fromuid/messages/:touid"
            , MessageController.messageController.userSendsMsg);
            
            app.delete("/api/messages/:mid"
            , MessageController.messageController.userDelsMsg);

            app.get("/api/users/:uid/sends"
            , MessageController.messageController.findSentMsg);

            app.get("/api/users/:uid/recvs"
            , MessageController.messageController.findRecMsg);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Create a message record.
     * @param req Represents request from client, including path
     * parameter fromuid representing the user id of the sentting user 
     * and touid representing the receiving user. And request body
     * msg representing the sent message.
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing message object. 
     */
    userSendsMsg = (req: Request, res: Response) =>
        MessageController.messageDao
            .userSendsMsg(req.params.fromuid, req.params.touid, req.body.msg)
            .then(message => res.json(message));

    /**
     * Delete a message record.
     * @param req Represents request from client, including path
     * parameter mid representing the message id that the user wants to delete.
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing delete status.
     */
    userDelsMsg = (req: Request, res: Response) =>
        MessageController.messageDao.userDelsMsg(req.params.mid)
        .then(status => res.send(status));

    /**
     * Find messages sent by the current user.
     * @param req Represents request from client, including path
     * parameter uid representing the current user's id.
     * @param res Represents response to client, including the 
     * body formatted as JSON arrays containing message object.
     */
    findSentMsg = (req: Request, res: Response) =>
        MessageController.messageDao.findSentMsg(req.params.uid)
        .then(messages => res.json(messages));

    /**
     * Find messages received by the current user.
     * @param req Represents request from client, including path
     * parameter uid representing the current user's id.
     * @param res Represents response to client, including the path parameter
     * body formatted as JSON arrays containing message object.
     */
    findRecMsg = (req: Request, res: Response) =>
        MessageController.messageDao.findRecMsg(req.params.uid)
        .then(messages => res.json(messages));
}
