/**
 * @file Controller RESTful Web Service API for bookmarks resource.
 */
import { Express, Request, Response } from "express";
import BookMarkDao from "../daos/BookMarkDao"
import BookMarkControllerI from "../interfaces/bookmarks/BookMarkController"

/**
 * @class BookMarkController Implements RESTful Web Service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *      <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit.</li>
 *      <li>DELETE /api/users/:uid/bookmarks/:tid to delete a bookmark.</li>
 *      <li>GET /api/users/:uid/bookmarks to retrieve all bookmarks that a user made.</li>
 * </ul>
 * @property {BookMarkDao} bookMarkDao Singleton DAO implementing bookmarks CRUD operations.
 * @property {BookMarkController} bookMarkController Singleton controller implementing
 * RESTful Web Service API.
 */
export default class BookMarkController implements BookMarkControllerI {
    private static bookMarkDao: BookMarkDao = BookMarkDao.getInstance();
    private static bookMarkController: BookMarkController | null = null;

    /**
     * Creates singleton controller instance.
     * @param app Express instance to declare the RESTful Web Service API.
     * @returns BookMarkController
     */
    public static getInstance = (app: Express): BookMarkController => {
        if (BookMarkController.bookMarkController === null) {
            BookMarkController.bookMarkController = new BookMarkController();

            app.post("/api/users/:uid/bookmarks/:tid"
            , BookMarkController.bookMarkController.userBookmarksTuit);

            app.delete("/api/users/:uid/bookmarks/:tid"
            , BookMarkController.bookMarkController.userUnBookmarksTuit);

            app.get("/api/users/:uid/bookmarks"
            , BookMarkController.bookMarkController.findAllTuitsBookmarkedByUser);
        }
        return BookMarkController.bookMarkController;
    }

    private constructor() { }

    /**
     * Record the new message.
     * @param req Represents request from client, including the path
     * parameter tid representing the linked tuit and uid representing
     * the bookmarked user.
     * @param res Represents response to client, including the body formatted
     * as JSON arrays containing tne bookmark object.
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookMarkController.bookMarkDao.userBookmarksTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Delete a message.
     * @param req Represents request from client, including the path
     * parameter tid representing the linked tuit and uid representing
     * the bookmarked user.
     * @param res Represents response to client, including the body formatted
     * as JSON containing the delete status.
     */
    userUnBookmarksTuit = (req: Request, res: Response) =>
        BookMarkController.bookMarkDao.userUnBookmarksTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));

    /**
     * Find all bookmarked tuits for a specific user.
     * @param req Represents request from client, including the path
     * parameter uid representing the bookmarked user.
     * @param res Represents response to client, including the body formatted
     * as JSON arrays containing the bookmark object.
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookMarkController.bookMarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(tuits => res.json(tuits));

}