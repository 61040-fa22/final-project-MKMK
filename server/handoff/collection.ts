import type {HydratedDocument, Types} from 'mongoose';
import type {Handoff} from './model';
import HandoffModel from './model';
import RequestCollection from '../request/collection';

class HandoffCollection {
  /**
   * Add a handoff to the collection
   *
   * @param {string} requestId - The id of the request referenced by the handoff
   * @return {Promise<HydratedDocument<Handoff>>} - The newly created handoff object
   */
  static async addOne(requestId: Types.ObjectId | string): Promise<HydratedDocument<Handoff>> {
    const request = await RequestCollection.findOne(requestId);
    const {ownerId, borrowerId, endDate} = request;
    const handoff = new HandoffModel({
      requestId,
      ownerId,
      borrowerId,
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
   * Get all the handoffs to the owner
   *
   * @param {string} userId - The ID of the user whose handoffs are sought
   * @return {Promise<HydratedDocument<Handoff>[]>} - An array of handoffs
   */
  static async findAllByUser(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Handoff>>> {
    return HandoffModel.find({$or: [{ownerId: userId}, {borrowerId: userId}]}).populate(['ownerId', 'borrowerId', 'requestId']);
  }

  /**
   * Update a handoff's returned status
   *
   * @param {string} handoffId - The id of the handoff to be updated
   * @param {string} userId - The Id of the user marking the item as returned
   * @return {boolean} Whether both users have marked the item as returned
   */
  static async returnOne(handoffId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<boolean> {
    const handoff = await HandoffModel.findOne({_id: handoffId});
    if (handoff.ownerId.toString() === userId.toString()) {
      handoff.ownerReturnClaim = new Date();
    } else if (handoff.borrowerId.toString() === userId.toString()) {
      handoff.borrowerReturnClaim = new Date();
    } else {
      throw new Error('The user with ID ' + userId.toString() + ' is not associated with this handoff');
    }

    handoff.returned = (handoff.ownerReturnClaim !== null && handoff.borrowerReturnClaim !== null);
    await handoff.save();
    return handoff.returned;
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
    await HandoffModel.deleteMany({$or: [{ownerId: userId}, {borrowerId: userId}]});
  }
}

export default HandoffCollection;
