import type {Request, Response, NextFunction} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as util from './util';
import LikeCollection from './collection';
import * as likeValidator from '../like/middleware';
import LikeModel from './model';
import type { Like } from './model';

const router = express.Router();

/**
 * Get all the likes
 *
 * @name GET /api/likes
 *
 * @return {LikeResponse[]} - A list of all the likes
 */
/**
 * Get likes by a given user.
 *
 * @name GET /api/likes?liker=username
 *
 * @return {LikeResponse[]} - An array of likes created by user with username, liker
 * @throws {400} - If user is not given
 *
 */
router.get(
  '/',
  [],
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if liker query parameter was supplied
    if (req.query.liker !== undefined) {
      next();
      return;
    }
    const allLikes = await LikeModel.find({});
    const response = allLikes.map(util.constructLikeResponse);
    res.status(200).json(response);
  },
  async (req: Request, res: Response) => {
    const likes = await LikeCollection.findManyByUsername(req.query.liker as string);
    const response = likes.map(util.constructLikeResponse);
    res.status(200).json(response);
  }
);

/**
 * Get likes for a given entry.
 *
 * @name GET /api/likes/:entryId
 *
 * @return {LikeResponse[]} - An array of likes created on a given entry, liked
 * @throws {400} - If user is not given
 *
 */
router.get(
  '/entry/:entryId',
  [],
  async (req: Request, res: Response) => {
    const likes = await LikeCollection.findManyByEntry(req.params.entryId as string);
    const response = likes.map(util.constructLikeResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new like.
 *
 * @name POST /api/likes/:entryId
 *
 * @param {string} entryId - The entry being liked
 * @return {LikeResponse} - The created like
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/:entryId',
  [
    userValidator.isUserLoggedIn,
    likeValidator.isValidEntry,
    likeValidator.isEntryUnliked
  ],
  async (req: Request, res: Response) => {
    const like = await LikeCollection.addOne(req.session.userId, req.params.entryId);

    res.status(201).json({
      message: 'Your like was created successfully.',
      like: util.constructLikeResponse(like)
    });
  }
);

/**
 * Delete a like
 *
 * @name DELETE /api/likes/:entryId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {403} - If the user has not liked this entry
 * @throws {404} - If the entryId is not valid
 */
router.delete(
  '/:entryId',
  [
    userValidator.isUserLoggedIn,
    likeValidator.isValidEntry,
    likeValidator.isEntryLiked
  ],
  async (req: Request, res: Response) => {
    const like: Like = await LikeModel.findOne({liker: req.session.userId, liked: req.params.entryId})
    await LikeCollection.deleteOne(like._id);
    res.status(200).json({
      message: 'Your like was deleted successfully.'
    });
  }
);

export {router as likeRouter};
