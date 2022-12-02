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
 * Checks if the name of the item in req.body is valid,
 * i.e not a stream of empty spaces
 */
const isValidItemName = (req: Request, res: Response, next: NextFunction) => {
  const {name} = req.body as {name: string};
  if (!name.trim()) {
    res.status(400).json({
      error: 'Item name must be at least one character long.'
    });
    return;
  }

  // CHANGE IF WE CHOOSE A MAX LENGTH
  // if (name.length > X) {
  //   res.status(413).json({
  //     error: 'ITEM name must be no more than X characters.'
  //   });
  //   return;
  // }

  next();
};

/**
 * Checks if the description of the item in req.body is valid,
 * i.e not a stream of empty spaces
 */
 const isValidItemDescription = (req: Request, res: Response, next: NextFunction) => {
  const {description} = req.body as {description: string};
  if (!description.trim()) {
    res.status(400).json({
      error: 'Item description must be at least one character long.'
    });
    return;
  }

  // CHANGE IF WE CHOOSE A MAX LENGTH
  // if (description.length > X) {
  //   res.status(413).json({
  //     error: 'ITEM description must be no more than X characters.'
  //   });
  //   return;
  // }

  next();
};

/**
 * Checks if the current user is the owner of the item whose itemId is in req.params
 */
const isValidItemModifier = async (req: Request, res: Response, next: NextFunction) => {
  const item = await ItemCollection.findOne(req.params.itemId);
  const ownerId = item.ownerId._id;
  if (req.session.userId !== ownerId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' items.'
    });
    return;
  }

  next();
};

export {
  isItemExists,
  isValidItemName,
  isValidItemDescription,
  isValidItemModifier
};
