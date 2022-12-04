import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ItemCollection from './collection';
import * as userValidator from '../user/middleware';
import * as itemValidator from '../item/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the items
 *
 * @name GET /api/items
 *
 * @return {ItemResponse[]} - A list of all the items
 */
/**
 * Get items by owner.
 *
 * @name GET /api/items?owner=username
 *
 * @return {ItemResponse[]} - An array of items created by user with username, owner
 * @throws {400} - If owner is not given
 * @throws {404} - If no user has given username
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if owner query parameter was supplied
    if (req.query.owner !== undefined) {
      next();
      return;
    }

    const allItems = await ItemCollection.findAll();
    const response = allItems.map(util.constructItemResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const ownerItems = await ItemCollection.findAllByUsername(req.query.owner as string);
    const response = ownerItems.map(util.constructItemResponse);
    res.status(200).json(response);
  }
);
  

/**
 * Create a new item.
 *
 * @name POST /api/items
 *
 * @param {string} name - The name of the item
 * @param {string} description - The description of the item
 * @return {Item} - The created item
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    itemValidator.isValidItemContent
  ],
  async (req: Request, res: Response) => {
    const {name, description} = req.body as {name: string; description: string};
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const item = await ItemCollection.addOne(userId, name, description);

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
    itemValidator.isItemExists,
    itemValidator.isValidItemModifier
  ],
  async (req: Request, res: Response) => {
    await ItemCollection.deleteOne(req.params.itemId);
    res.status(200).json({
      message: 'Your item was deleted successfully.'
    });
  }
);

/**
 * Modify an item
 *
 * @name PATCH /api/items/:id
 *
 * @param {string} name - the new name for the item
 * @param {string} description - the new description for the item
 * @return {Item} - the updated item
 * @throws {403} - if the user is not logged in or not the owner of
 *                 of the item
 * @throws {404} - If the itemId is not valid
 * @throws {400} - If the item name is empty or a stream of empty spaces
 * @throws {413} - If the item content is more than 140 characters long
 */
router.patch(
  '/:itemId?',
  [
    userValidator.isUserLoggedIn,
    itemValidator.isItemExists,
    itemValidator.isValidItemModifier,
    itemValidator.isValidItemContent
  ],
  async (req: Request, res: Response) => {
    let item = await ItemCollection.findOne(req.params.itemId); // Unchanged item
    if (req.body.name) { // Item with new name
      item = await ItemCollection.updateOneName(req.params.itemId, req.body.name);
    }
    if (req.body.description) { // Item with new description
      item = await ItemCollection.updateOneDescription(req.params.itemId, req.body.description);
    }
    res.status(200).json({
      message: 'Your item was updated successfully.',
      item
    });
  }
);

export {router as itemRouter};
