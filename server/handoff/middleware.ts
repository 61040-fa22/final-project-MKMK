import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import HandoffCollection from './collection';

/**
 * Checks if a handoff with handoffId in req.params exists
 */
const isHandoffExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.handoffId);
  const handoff = validFormat ? await HandoffCollection.findOne(req.params.handoffId) : '';
  if (!handoff) {
    res.status(404).json({
      error: `Handoff with handoff ID ${req.params.handoffId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the given dates are valid
 */
const isValidBorrowDates = async (req: Request, res: Response, next: NextFunction) => {
  const {itemId, borrowerId, startDate, endDate} = req.body as {itemId: Types.ObjectId; borrowerId: Types.ObjectId; startDate: Date; endDate: Date};
  const now = new Date();
  // TODO: isValidTimeRange
  // TODO: add isDatesAvailable
  if (now > startDate || startDate > endDate) {
    res.status(404).json({
      error: 'Invalid start or end date.'
    });
    return;
  }

  next();
};

/**
 * TODO:
 * isValidHandoffModifier
 * Checks if the person accepting is the owner of the item
 */
export {
  isHandoffExists,
  isValidBorrowDates
};
