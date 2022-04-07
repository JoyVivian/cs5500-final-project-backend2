/**
 * @file Declares API for messages related controller methods
 */
import {Request, Response} from "express";


export default interface MessageController {
    userSendsMsg(req: Request, res: Response): void;
    userDelsMsg(req: Request, res: Response): void;
    findSentMsg(req: Request, res: Response): void;
    findRecMsg(req: Request, res: Response): void;
}