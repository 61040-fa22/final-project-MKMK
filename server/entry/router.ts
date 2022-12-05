import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import EntryCollection from './collection';
import * as userValidator from '../user/middleware';
import * as entryValidator from './middleware';
import * as itemValidator from '../item/middleware';

import * as util from './util';

const router = express.Router();

/**
 * Get all the entries
 *
 * @name GET /api/entries
 *
 * @return {EntryResponse[]} - A list of all the entry sorted in descending
 *                      order by date createdi
 */

/**
 * Get entry by author.
 *
 * @name GET /api/entries/entry?author=username
 *
 * @return {EntryResponse[]} - An array of entries created by user with username, author
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 *
 */
router.get(
  '/',
  [
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if author query parameter was supplied
    if (req.query.author !== undefined) {
      next();
      return;
    }
    const allEntries = await EntryCollection.findAll();
    const response = allEntries.map(util.constructEntryResponse);
    res.status(200).json(response);
  },
  async (req: Request, res: Response) => {
    const authorEntries = await EntryCollection.findAllByUsername(req.query.author as string);
    const response = authorEntries.map(util.constructEntryResponse);
    res.status(200).json(response);
  }
);

/**
 * Get entry by item.
 *
 * @name GET /api/entries/item/:itemId
 *
 * @return {EntryResponse[]} - An array of entries related to given item 
 * @throws {400} - If item is not given
 * @throws {404} - If item does not exist
 *
 */
 router.get(
  '/item',

  // async (req: Request, res: Response, next: NextFunction) => {
  //   // Check if itemId query parameter was supplied
  //   // if (req.query.itemId !== undefined) {
  //   //   res.status(200);
  //   //   next();
  //   //   return;
  //   // }
  //   // const allEntries = await EntryCollection.findAll();
  //   // const response = allEntries.map(util.constructEntryResponse);
  // },
  async (req: Request, res: Response) => {
    const itemEntries = await EntryCollection.findAllByItem(req.query.itemId as string);
    const response = itemEntries.map(util.constructEntryResponse);
    res.status(200).json(response);

  }
);


/**
 * Create a new entry.
 *
 * @name POST /api/entry
 *
 * @param {string} content - The content of the entry
 * @return {EntryResponse} - The created entry
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the entry content is empty or a stream of empty spaces
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    entryValidator.isValidEntryContent
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const entry = await EntryCollection.addOne(userId, req.body.itemId, req.body.content);

    res.status(201).json({
      message: 'Your entry was created successfully.',
      entry: util.constructEntryResponse(entry)
    });
  }
);

/**
 * Delete a entry
 *
 * @name DELETE /api/entry/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the entry
 * @throws {404} - If the entryId is not valid
 */
router.delete(
  '/:entryId?',
  [
    userValidator.isUserLoggedIn,
    entryValidator.isEntryExists,
    entryValidator.isValidEntryModifier
  ],
  async (req: Request, res: Response) => {
    await EntryCollection.deleteOne(req.params.entryId);
    res.status(200).json({
      message: 'Your entry was deleted successfully.'
    });
  }
);


export {router as entryRouter};
