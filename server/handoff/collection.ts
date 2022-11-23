import type {HydratedDocument, Types} from 'mongoose';
import type {Handoff} from './model';
import HandoffModel from './model';
import UserCollection from '../user/collection';
// Cimport ItemCollection from '../item/collection';
import {isUserLoggedIn} from 'server/user/middleware';

class HandoffCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} itemId - The id of the item to be borrowed
   * @param {string} borrowerId - The id of the user making the borrow request
   * @param {date} startDate - The proposed start date of the borrowing period
   * @param {date} endDate - The proposed end date of the borrowing period
   * @return {Promise<HydratedDocument<Handoff>>} - The newly created freet
   */
  static async addOne(itemId: Types.ObjectId | string, borrowerId: Types.ObjectId | string, startDate: Date, endDate: Date): Promise<HydratedDocument<Handoff>> {
    // TODO: create item, item collection. make sure it has an _id and a field called ownerId
    // Const ownerId = ItemCollection.findOneById({_id: itemId}).ownerId;
    const handoff = new HandoffModel({
      itemId,
      // OwnerId,
      borrowerId,
      startDate,
      endDate
    });
    await handoff.save(); // Saves handoff to MongoDB
    return handoff;
  }

  /**
   * Find a handoff by handoffId
   *
   * @param {string} handoffId - The id of the handoff to find
   * @return {Promise<HydratedDocument<Handoff>> | Promise<null> } - The handoff with the given handoffId, if any
   */
  static async findOne(handoffId: Types.ObjectId | string): Promise<HydratedDocument<Handoff>> {
    return HandoffModel.findOne({_id: handoffId});
  }

  /**
   * Get all the handoffs in the database
   *
   * @return {Promise<HydratedDocument<Handoff>[]>} - An array of all of the handoffs
   */
  static async findAll(): Promise<Array<HydratedDocument<Handoff>>> {
    // Retrieves handoffs and sorts them from most to least recent endDate
    return HandoffModel.find({}).sort({endDate: -1}).populate('ownerId borrowerId itemId');
  }

  /**
   * Get all the handoffs associated with an item
   *
   * @param {string} itemId - The ID of the item whose handoffs are sought
   * @return {Promise<HydratedDocument<Handoff>[]>} - An array of the handoffs for this item
   */
  static async findAllByItem(itemId: Types.ObjectId | string): Promise<Array<HydratedDocument<Handoff>>> {
    return HandoffModel.find({itemId});
  }

  /**
   * Get all the handoffs associated with a user
   *
   * @param {string} userId - The ID of the user whose handoffs are sought
   * @return {Promise<HydratedDocument<Handoff>[]>} - An array of handoffs
   */
  static async findAllByUser(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Handoff>>> {
    return HandoffModel.find({$or: [{ownerId: userId}, {borrowerId: userId}]});
  }

  /**
   * Get all the handoffs associated with a group
   *
   * @param {string} groupId - The ID of the group whose handoffs are sought
   * @return {Promise<HydratedDocument<Handoff>[]>} - An array of handoffs
   */
  static async findAllByGroup(groupId: Types.ObjectId | string): Promise<Array<HydratedDocument<Handoff>>> {
    // TODO: update this when group collection exists
    // All users in the group with groupId
    // Xconst groupUsers = await GroupCollection.findUsersByGroup({groupId});
    // Find all handoffs whose ownerId or borrowerId are in groupUsers
    return HandoffModel.find();// C{$or: [{ownerId:{$in: groupUsers}}, {borrowerId:{ $in: groupUsers}}]});
  }

  /**
   * Update a handoff's accepted status
   *
   * @param {string} handoffId - The id of the handoff to be updated
   * @param {boolean} accepted - Whether or not the handoff has been accepted
   * @return {Promise<HydratedDocument<Handoff>>} - The newly updated handoff
   */
  static async acceptOne(handoffId: Types.ObjectId | string, accepted: boolean): Promise<HydratedDocument<Handoff>> {
    const handoff = await HandoffModel.findOne({_id: handoffId});
    handoff.accepted = accepted;
    await handoff.save();
    return handoff;
  }

  /**
   * Delete a handoff with given handoffId.
   *
   * @param {string} handoffId - The Id of handoff to delete
   * @return {Promise<Boolean>} - true if the handoff has been deleted, false otherwise
   */
  static async deleteOne(handoffId: Types.ObjectId | string): Promise<boolean> {
    const handoff = await HandoffModel.deleteOne({_id: handoffId});
    return handoff !== null;
  }

  /**
   * Delete all the handoffs by the given user
   *
   * @param {string} userId - The id of owner of the handoffs
   */
  static async deleteMany(userId: Types.ObjectId | string): Promise<void> {
    await HandoffModel.deleteMany({ownerId: userId});
  }
}

export default HandoffCollection;
