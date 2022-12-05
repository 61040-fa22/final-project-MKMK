import type {HydratedDocument, Types} from 'mongoose';
import type {Request} from './model';
import RequestModel from './model';
import UserCollection from '../user/collection';
import ItemCollection from '../item/collection';
import {isUserLoggedIn} from 'server/user/middleware';

class RequestCollection {
  /**
   * Add a Request to the collection
   *
   * @param {string} itemId - The id of the item to be borrowed
   * @param {string} borrowerId - The id of the user making the borrow request
   * @param {date} startDate - The proposed start date of the borrowing period
   * @param {date} endDate - The proposed end date of the borrowing period
   * @return {Promise<HydratedDocument<Request>>} - The newly created Request object
   */
  static async addOne(itemId: Types.ObjectId | string, borrowerId: Types.ObjectId | string, startDate: Date, endDate: Date): Promise<HydratedDocument<Request>> {
    const item = await ItemCollection.findOne(itemId);
    const {ownerId} = item;
    const Request = new RequestModel({
      itemId,
      ownerId,
      borrowerId,
      startDate,
      endDate
    });
    await Request.save(); // Saves Request to MongoDB
    return Request;
  }

  /**
   * Find a Request by RequestId
   *
   * @param {string} RequestId - The id of the Request to find
   * @return {Promise<HydratedDocument<Request>> | Promise<null> } - The Request with the given RequestId, if any
   */
  static async findOne(RequestId: Types.ObjectId | string): Promise<HydratedDocument<Request>> {
    return RequestModel.findOne({_id: RequestId});
  }

  /**
   * Get all the Requests in the database
   *
   * @return {Promise<HydratedDocument<Request>[]>} - An array of all of the Requests
   */
  static async findAll(): Promise<Array<HydratedDocument<Request>>> {
    // Retrieves Requests and sorts them from most to least recent endDate
    return RequestModel.find({}).sort({endDate: -1}).populate('ownerId borrowerId itemId');
  }

  /**
   * Get all the Requests associated with an item
   *
   * @param {string} itemId - The ID of the item whose Requests are sought
   * @return {Promise<HydratedDocument<Request>[]>} - An array of the Requests for this item
   */
  static async findAllByItem(itemId: Types.ObjectId | string): Promise<Array<HydratedDocument<Request>>> {
    return RequestModel.find({itemId});
  }

  /**
   * Get all the Requests to/from the owner
   *
   * @param {string} userId - The ID of the user whose Requests are sought
   * @return {Promise<HydratedDocument<Request>[]>} - An array of Requests
   */
  static async findAllByUser(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Request>>> {
    return RequestModel.find({$or: [{ownerId: userId}, {borrowerId: userId}]}).populate(['itemId', 'ownerId', 'borrowerId']);
  }

  /**
   * Update a Request's accepted status
   *
   * @param {string} requestId - The id of the Request to be updated
   * @param {boolean} accepted - Whether or not the Request has been accepted
   * @return {Promise<HydratedDocument<Request>>} - The newly updated Request
   */
  static async acceptOne(requestId: Types.ObjectId | string, accepted: boolean): Promise<HydratedDocument<Request>> {
    const Request = await RequestModel.findOne({_id: requestId});
    Request.accepted = accepted;
    await Request.save();
    return Request;
  }

  /**
   * Delete a Request with given requestId.
   *
   * @param {string} requestId - The Id of Request to delete
   * @return {Promise<Boolean>} - true if the Request has been deleted, false otherwise
   */
  static async deleteOne(requestId: Types.ObjectId | string): Promise<boolean> {
    const Request = await RequestModel.deleteOne({_id: requestId});
    return Request !== null;
  }

  /**
   * Delete all the Requests by the given user
   *
   * @param {string} userId - The id of owner of the Requests
   */
  static async deleteMany(userId: Types.ObjectId | string): Promise<void> {
    await RequestModel.deleteMany({$or: [{ownerId: userId}, {borrowerId: userId}]});
  }
}

export default RequestCollection;
