import type {Request, Response} from 'express';
import express from 'express';
import type {Types} from 'mongoose';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import HandoffCollection from './collection';
import * as requestValidator from '../request/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all handoffs associated with the user
 *
 * @name GET /api/handoffs?user=username
 *
 * @return {HandoffResponse[]} - A list of all the handoffs to/from the specified user
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
    const handoffs = await HandoffCollection.findAllByUser(user._id);
    const response = await Promise.all(handoffs.map( util.constructHandoffResponse));
    res.status(200).json(response);
  }
);

/**
 * Create a new  handoff.
 *
 * @name POST /api/handoffs
 *
 * @param {string} requestId - The id of the item to be borrowed
 * @return {HandoffResponse} - The created handoff
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the entry content is empty or a stream of empty spaces
 * @throws {413} - If the entry content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const requestId = req.body.requestId;
    const handoff = await HandoffCollection.addOne(requestId);
    res.status(201).json({
      message: 'Your handoff was created successfully.',
      handoff: util.constructHandoffResponse(handoff)
    });
  }
);

/**
 * Update return claims on handoff
 *
 * @name PATCH /api/handoffs/:id
 *
 * @return {string} a success message
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the entry
 * @throws {404} - If the handoffId is not valid
 */
router.patch(
  '/:handoffId?',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    console.log('router heard return!');
    const returned = await HandoffCollection.returnOne(req.params.handoffId, req.session.userId);
    console.log('finished returnone');
    const message = 'You successfully marked the item as returned.';
    const addition = 'Awaiting other party to mark item as returned.';
    res.status(200).json({
      message: message + (returned ? '' : addition)
    });
  }
);

export {router as handoffRouter};
