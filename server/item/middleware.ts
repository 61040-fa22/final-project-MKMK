import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ItemCollection from '../item/collection';

/**
 * Checks if a item with itemId in req.params exists
 */
const isItemExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.itemId);
  const item = validFormat ? await ItemCollection.findOne(req.params.itemId) : '';
  if (!item) {
    res.status(404).json({
      error: `Item with item ID ${req.params.itemId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the owner of the item whose itemId is in req.params
 */
const isValidItemModifier = async (req: Request, res: Response, next: NextFunction) => {
  const item = await ItemCollection.findOne(req.params.itemId);
  if (req.session.userId !== item.ownerId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' items.'
    });
    return;
  }
  next();
};

/**
 * Checks if the current name and description in req.params are valid (must have a name, length limit on name & description)
 */
const isValidItemContent = async (req: Request, res: Response, next: NextFunction) => {
  const {name, description} = req.body as {name: string; description: string};
  if (!name.trim()) {
    res.status(400).json({
      error: 'Item name must be at least one character long.'
    });
    return;
  }

  if (name.length > 50) {
    res.status(413).json({
      error: 'Item name must be no more than 50 characters.'
    });
    return;
  }

  if (description.length > 140) {
    res.status(413).json({
      error: 'Item description must be no more than 140 characters.'
    });
    return;
  }

  next();
};

export {
  isItemExists,
  isValidItemModifier,
  isValidItemContent
};
