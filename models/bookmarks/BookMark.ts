/**
 * @file Declare BookMark data type repesenting relationship between 
 * users and tuits, as in user bookmarks a tuit.
 */
import Tuit from "../tuits/Tuit"
import User from "../users/User"

/**
 * @typedef BookMark Represents bookmarks relationship between 
 * users and tuits, as in user bookmarks a tuit.
 * @property {Tuit} tuit Tuit being bookmarked.
 * @property {User} bookMarkedBy User bookmarks the tuit.
 */
export default interface BookMark {
    tuit: Tuit,
    bookMarkedBy: User
};