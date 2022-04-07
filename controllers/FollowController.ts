/**
 * @file Controller RESTful Web Service API for follow resource.
 */
import { Express, Request, Response } from "express";
import FollowControllerI from "../interfaces/follows/FollowController";
import FollowDao from "../daos/FollowDao";

/**
 * @class FolloController Implements RESTful Web Service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li>POST /api/users/:uid/follows/:followingid to create a record of follow relationship.</li>
 *  <li>DELETE /api/users/:uid/follows/:followingid to delete a record containing a follow relationship. </li>
 *  <li>GET /api/users/:uid/followed to retrieve all followers of the current user.</li>
 *  <li>GET /api/users/:uid/following to retrieve all users the current user follows.</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations.
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web Service API.
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance.
     * @param app Express instance to declare the RESTful Web Service API.
     * @returns FollowController 
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post('/api/users/:uid/follows/:followingid'
                , FollowController.followController.userFollowsUser);
            app.delete('/api/users/:uid/follows/:followingid'
                , FollowController.followController.userUnFollowsUser);
            app.get('/api/users/:uid/followed',
                FollowController.followController.findAllFollwedUsers);
            app.get('/api/users/:uid/following',
                FollowController.followController.findAllFollowingUsers);
        }
        return FollowController.followController;
    }

    private constructor() { }

    /**
     * Create record of a follow relationship.
     * @param req Represents request from client, including the path
     * parameter uid representing the current user id and followingid representing
     * the user id followed by the current user.
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the follwers field.
     */
    userFollowsUser(req: Request, res: Response): void {
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.followingid)
            .then(follows => res.json(follows));
    }

    /**
     * Delete record of a follow relationship.
     * @param req Represents request from client, including the path
     * parameter uid representing the current user id and followingid representing
     * the user id followed by the current user.
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the follwers field.
     */
    userUnFollowsUser(req: Request, res: Response): void {
        FollowController.followDao.userUnFollowsUser(req.params.uid, req.params.followingid)
            .then(unFollows => res.json(unFollows));
    }

    /**
     * Retrieves all followers of the current user.
     * @param req Represents request from client, including path parameters
     * uid representing the user id that wanted to look for.
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the follwers field.
     */
    findAllFollwedUsers(req: Request, res: Response): void {
        FollowController.followDao.findAllFollowedUsers(req.params.uid)
            .then(followers => res.json(followers));
    }

    /**
     * Retrieves all users that the current user follows.
     * @param req Represents request from client, including path parameters
     * uid representing the user id that wanted to look for.
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the follwers field.
     */
    findAllFollowingUsers(req: Request, res: Response): void {
        FollowController.followDao.findAllFollowingUsers(req.params.uid)
            .then(followings => res.json(followings));
    }

}