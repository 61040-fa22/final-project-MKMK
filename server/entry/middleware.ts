import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import EntryCollection from './collection';

/**
 * Checks if a entry with entryId is req.params exists
 */
const isEntryExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.entryId);
  const entry = validFormat ? await EntryCollection.findOne(req.params.entryId) : '';
  if (!entry) {
    res.status(404).json({
      error: `Entry with entry ID ${req.params.entryId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the entry in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidEntryContent = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'Entry content must be at least one character long.'
    });
    return;
  }

  if (content.length > 140) {
    res.status(413).json({
      error: 'Entry content must be no more than 140 characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author of the entry whose entryId is in req.params
 */
const isValidEntryModifier = async (req: Request, res: Response, next: NextFunction) => {
  const entry = await EntryCollection.findOne(req.params.entryId);
  const userId = entry.authorId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' entries.'
    });
    return;
  }

  next();
};

export {
  isValidEntryContent,
  isEntryExists,
  isValidEntryModifier
};
