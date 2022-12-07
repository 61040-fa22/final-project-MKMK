import type {NextFunction, Request, Response} from 'express';
import e from 'express';
import express from 'express';
import type {Types} from 'mongoose';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import RequestCollection from './collection';
import * as requestValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the requests to and from the given user
 *
 * @name GET /api/requests?user=username
 *
 * @return {RequestResponse[]} - A list of all the requests to/from the specified user
 * @throws {400} - If username is not given
 * @throws {404} - If no user has given username
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
    requestValidator.isRequestForUser
  ],
  async (req: Request, res: Response) => {
    const username = req.query.user as string;
    const user = await UserCollection.findOneByUsername(username);
    const requests = await RequestCollection.findAllByUser(user._id);
    const response = requests.map(util.constructRequestResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new borrow request.
 *
 * @name POST /api/requests
 *
 * @param {string} itemId - The id of the item to be borrowed
 * @param {date} startDate - The proposed start date of the borrowing period
 * @param {date} endDate - The proposed end date of the borrowing period
 * @return {RequestResponse} - The created request
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the entry content is empty or a stream of empty spaces
 * @throws {413} - If the entry content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    requestValidator.isValidTimeRange
  ],
  async (req: Request, res: Response) => {
    const borrowerId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const {itemId, startDate, endDate} = req.body as {itemId: Types.ObjectId; startDate: Date; endDate: Date};
    const request = await RequestCollection.addOne(itemId, borrowerId, startDate, endDate);
    res.status(201).json({
      message: 'Your request was created successfully.',
      request: util.constructRequestResponse(request)
    });
  }
);

/**
 * Delete a request
 *
 * @name DELETE /api/requests/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the creator of
 *                 the request
 * @throws {404} - If the requestId is not valid
 */
router.delete(
  '/:requestId?',
  [
    userValidator.isUserLoggedIn,
    requestValidator.isRequestExists,
    requestValidator.isRequestBorrower
  ],
  async (req: Request, res: Response) => {
    await RequestCollection.deleteOne(req.params.requestId);
    res.status(200).json({
      message: 'Your entry was deleted successfully.'
    });
  }
);

/**
 * Accept or reject a request
 *
 * @name PATCH /api/requests/accept/:id
 *
 * @param {boolean} accept - whether or not the request is accepted
 * @return {RequestResponse} - the updated request
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the entry
 * @throws {404} - If the requestId is not valid
 */
router.patch(
  '/accept/:requestId?',
  [
    userValidator.isUserLoggedIn,
    requestValidator.isRequestExists,
    requestValidator.isRequestOwner
  ],
  async (req: Request, res: Response) => {
    const request = await RequestCollection.acceptOne(req.params.requestId, req.body.accept);
    const acceptOrReject = req.body.accept ? 'accepted' : 'rejected';
    res.status(200).json({
      message: 'You successfully ' + acceptOrReject + ' the borrow request.',
      request: util.constructRequestResponse(request)
    });
  }
);

export {router as requestRouter};
