/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookMarkModel
 * to integrate with MongoDB
 */
import BookMarkDaoI from "../interfaces/bookmarks/BookMarkDao"
import BookMark from "../models/bookmarks/BookMark"
import BookMarkModel from "../mongoose/bookmarks/BookMarkModel";

/**
 * @class UserDao Implements DAO managing data storage of Users.
 * @property {BookMarkDao} bookMarkDao Private singleton instance of BookMarkDao.
 */
export default class BookMarkDao implements BookMarkDaoI {
    private static bookMarkDao: BookMarkDao | null = null;
    
    /**
     * Create singleton DAO instance.
     * @returns BookMarkDao
     */
    public static getInstance = (): BookMarkDao => {
        if (BookMarkDao.bookMarkDao === null) {
            BookMarkDao.bookMarkDao = new BookMarkDao();
        }
        return BookMarkDao.bookMarkDao;
    }

    private constructor () {}

    /**
     * Uses BookMarkModel to create a new bookmark record.
     * @param tid Tuit's primary key.
     * @param uid User's primary key.
     * @returns Promise to be notified when bookmark is created.
     */
    userBookmarksTuit = async (tid: string, uid: string): Promise<BookMark> =>
        BookMarkModel.create({ tuit: tid, bookMarkedBy: uid });
    
    /**
     * Uses BookMarkModel to delete a bookmark record.
     * @param tid Tuit's primary key.
     * @param uid User's primary key.
     * @returns Promise to be notified when bookmark is deleted.
     */
    userUnBookmarksTuit = async (tid: string, uid: string): Promise<any> => 
        BookMarkModel.deleteOne({tuit: tid, bookMarkedBy: uid});
    
    /**
     * Uses BookMarkModel to find bookmarks of a specific user.
     * @param uid User's primary key.
     * @returns Promise to be notified when bookmark is retrieved from the database.
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<BookMark[]> => 
        BookMarkModel
        .find({'bookMarkedBy': uid})
        .populate('tuit')
        .exec();
}