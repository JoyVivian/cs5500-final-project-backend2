/**
 * @file Declares API for Likes related controller methods
 */
import {Request, Response} from "express";

export default interface BookMarkController {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnBookmarksTuit(req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
};