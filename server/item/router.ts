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

export {router as itemRouter};
