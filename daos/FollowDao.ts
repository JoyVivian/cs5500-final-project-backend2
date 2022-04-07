/**
 * @file Implements DAO managing data storage of the follows. Use mongoose FollowModel
 * to integrate with MongoDB 
 */
import FollowDaoI from "../interfaces/follows/FollowDao"
import User from "../models/users/User"
import UserModel from "../mongoose/users/UserModel"

/**
 * @class FollowDao Implements DAO managing data storage of Users.
 * @property {FollowDao} followDao Private singleton instance of FollowDao.
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    
    /**
     * Create singleton DAO instance.
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to delete follow record.
     * @param uid User's primary key.
     * @param followingId Following's primary key.
     * @returns Promise to be notified when follow record is deleted.
     */
    async userUnFollowsUser(uid: string, followingId: string): Promise<any> {
        return await UserModel.findByIdAndUpdate(followingId, {$pull: {followers: uid}}, {new: true});
    }

    
    /**
     * Uses FollowModel to retrieve followers.
     * @param uid User's primary key
     * @returns Promise to be notified when followers are found.
     */
    async findAllFollowedUsers(uid: string): Promise<any> {
        return await UserModel
        .findById(uid)
        .populate('followers')
        .exec();
    }

    /**
     * Use FollowModel to retrieve following users.
     * @param uid User's primary key.
     * @returns Promise to be notified when following users are found.
     */
    async findAllFollowingUsers(uid: string): Promise<User[]> {
        return await UserModel
        .find({followers: uid})
        .exec();
    }

    /**
     * Uses FollowModel to create a follow record.
     * @param uid User's primary key.
     * @param followingId Following's primary key.
     * @returns Promise to be notified when follow record is created.
     */
    async userFollowsUser(uid: string, followingId: string): Promise<any> {
        //The purpose of adding {new: true} is to return a document after modification.
        return await UserModel.findByIdAndUpdate(followingId,
        {$push: {followers: uid}}, {new: true});
    }
}