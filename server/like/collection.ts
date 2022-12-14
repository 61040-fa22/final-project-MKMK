import type {HydratedDocument} from 'mongoose';
import { Types } from 'mongoose';
import type {Like} from './model';
import LikeModel from '../like/model';
import UserCollection from '../user/collection';
import mongoose from 'mongoose';

/**
 * This file contains a class with functionality to interact with Likes stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 */
class LikeCollection {
  /**
   * Add a new Like
   *
   * @param {string} userId - The userId of the account making this like
   * @param {string} entryId - The ID of the entry being liked
   * @return {Promise<HydratedDocument<Like>>} - The newly created Like
   */
  static async addOne(userId: Types.ObjectId | string, entryId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    const like = new LikeModel({
      liker: new Types.ObjectId(userId),
      liked: new Types.ObjectId(entryId)
    });
    await like.save(); // Saves like to MongoDB
    return like;
  }

  /**
   * Find a Like by likeId.
   *
   * @param {string} likeId - The likeId of the Like to find
   * @return {Promise<HydratedDocument<Like>> | Promise<null>}
   */
  static async findOneByLikeId(likeId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    return LikeModel.findOne({_id: likeId});
  }

  /**
   * Find all likes for a given entry
   *
   * @param {string} entryId - The ID of the entry
   * @return {Promise<HydratedDocument<Like>[]> | Promise<null>}
   */
  static async findManyByEntry(entryId: Types.ObjectId | string): Promise<HydratedDocument<Like>[]> {
    return LikeModel.find({liked: entryId});
  }

  /**
   * Find all likes by a given user
   *
   * @param {string} userId - The ID of the user
   * @return {Promise<HydratedDocument<Like>[]> | Promise<null>}
   */
  static async findManyByUser(userId: Types.ObjectId | string): Promise<HydratedDocument<Like>[]> {
    return LikeModel.find({liker: userId});
  }

  /**
   * Find all likes by a given username
   *
   * @param {string} username - the username of the user
   * @return {Promise<HydratedDocument<Like>[]> | Promise<null>}
   */
  static async findManyByUsername(username: string): Promise<HydratedDocument<Like>[]> {
    try {
      const user = await UserCollection.findOneByUsername(username);
      return LikeModel.find({liker: user._id});
    }
    catch {
      return []
    }
  }

  /**
   * Delete a Like from the collection.
   *
   * @param {string} likeId - The likeId of Like to delete
   * @return {Promise<Boolean>} - true if the Like has been deleted, false otherwise
   */
  static async deleteOne(likeId: Types.ObjectId | string): Promise<boolean> {
    const like = await LikeModel.deleteOne({_id: likeId});
    return like !== null;
  }
}

export default LikeCollection;
