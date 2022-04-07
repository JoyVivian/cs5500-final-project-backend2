import {Request, Response} from 'express';

/**
 * @file Declare API for Follow related controller functions.
 */
export default interface FollowController {
    userFollowsUser(req: Request, res: Response): void;
    userUnFollowsUser(req: Request, res: Response): void;
    findAllFollwedUsers(req: Request, res: Response):void;
    findAllFollowingUsers(req: Request, res: Response):void;
}