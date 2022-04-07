import User from "../../models/users/User"

/**
 * @file Declare API for Follow related data access methods.
 */
export default interface FollowDao {
    userFollowsUser(uid: string, followingId: string): Promise<any>;
    userUnFollowsUser(uid: string, followingId: string): Promise<any>;
    findAllFollowedUsers(uid: string): Promise<any>;
    findAllFollowingUsers(uid: string): Promise<User[]>;
};