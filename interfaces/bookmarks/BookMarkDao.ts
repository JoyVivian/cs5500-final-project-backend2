/**
 * @file Declares API for bookmarks related data access object methods
 */
import BookMark from "../../models/bookmarks/BookMark"

export default interface Bookmark {
    userBookmarksTuit(tid: string, uid: string): Promise<BookMark>;
    userUnBookmarksTuit(tid: string, uid: string): Promise<any>;
    findAllTuitsBookmarkedByUser(uid: string): Promise<BookMark[]>;
};