import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import HandoffCollection from './collection';
import * as userValidator from '../user/middleware';
import * as itemValidator from '../item/middleware';

const router = express.Router();

/**
 * Get all the items
 *
 * @name GET /api/items
 *
 * @return {HandoffResponse[]} - A list of all the items
 */


/**
 * Create a new item.
 *
 * @name POST /api/items
 *
 * @param {string} name - The name of the item
 * @param {string} description - The description of the item
 * @return {Handoff} - The created item
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    itemValidator.isValidHandoffContent
  ],
  async (req: Request, res: Response) => {
    const {name, description} = req.body as {name: string; description: string};
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const item = await HandoffCollection.addOne(userId, name, description);

    res.status(201).json({
      message: 'Your item was created successfully.',
      item
    });
  }
);

/**
 * Delete an item
 *
 * @name DELETE /api/items/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the item
 * @throws {404} - If the itemId is not valid
 */
router.delete(
  '/:itemId?',
  [
    userValidator.isUserLoggedIn,
    itemValidator.isHandoffExists,
    itemValidator.isValidHandoffModifier
  ],
  async (req: Request, res: Response) => {
    await HandoffCollection.deleteOne(req.params.itemId);
    res.status(200).json({
      message: 'Your item was deleted successfully.'
    });
  }
);




export {router as handoffRouter};
