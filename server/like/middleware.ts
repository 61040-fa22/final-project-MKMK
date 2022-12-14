import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import EntryCollection from '../entry/collection';
import LikeCollection from './collection';
import LikeModel from './model';

/**
 * Checks if an entry with entryId in req.params exists
 */
const isValidEntry = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.entryId);
  const entry = validFormat ? await EntryCollection.findOne(req.params.entryId) : '';

  if (!entry) {
    res.status(404).json({
      error: `Entry with ID ${req.params.entryId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the user has already liked an entry
 */
const isEntryLiked = async (req: Request, res: Response, next: NextFunction) => {
  const liker = req.session.userId as string;
  const like = await LikeModel.findOne({entryId: req.params.entryId, liker: liker});
  if (!like) {
    res.status(403).json({
      error: 'You have not liked this entry yet.'
    });
    return;
  }

  next();
};

/**
 * Checks that user hasn't already liked a entry
 */
const isEntryUnliked = async (req: Request, res: Response, next: NextFunction) => {
  const liker = req.session.userId as string;
  const like = await LikeModel.findOne({liked: req.params.entryId, liker: liker});
  if (like) {
    res.status(403).json({
      error: 'You are have already liked this entry.'
    });
    return;
  }

  next();
};

export {
  isValidEntry,
  isEntryLiked,
  isEntryUnliked
};
