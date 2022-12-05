import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import RequestCollection from './collection';
import UserCollection from '../user/collection';

/**
 * Checks if a request with requestId in req.params exists
 */
const isRequestExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.requestId);
  const request = validFormat ? await RequestCollection.findOne(req.params.requestId) : '';
  if (!request) {
    res.status(404).json({
      error: `request with request ID ${req.params.requestId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the given dates are valid
 */
const isValidTimeRange = async (req: Request, res: Response, next: NextFunction) => {
  const startDate = req.body.startDate as Date;
  const endDate = req.body.endDate as Date;
  const now = new Date();
  if (now > startDate || startDate > endDate) {
    res.status(404).json({
      error: 'Invalid start or end date.'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the one whose requests are being found
 * user should not be able to see requests that are not to or from them.
 */
const isRequestForUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserCollection.findOneByUsername(req.query.user as string);
  if (req.session.userId !== user._id.toString()) {
    res.status(403).json({
      error: 'Cannot view other users\' requests.'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author (borrower) of the request whose requestId is in req.params
 */
const isRequestBorrower = async (req: Request, res: Response, next: NextFunction) => {
  const request = await RequestCollection.findOne(req.params.requestId);
  if (req.session.userId !== request.borrowerId.toString()) {
    res.status(403).json({
      error: 'Cannot delete other users\' requests.'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the owner of the item in the request whose requestId is in req.params
 */
const isRequestOwner = async (req: Request, res: Response, next: NextFunction) => {
  const request = await RequestCollection.findOne(req.params.requestId);
  if (req.session.userId !== request.ownerId.toString()) {
    res.status(403).json({
      error: 'Cannot accept other users\' requests.'
    });
    return;
  }

  next();
};

/**
 * TODO:
 * isDatesAvailable: Check that item is available for the proposed dates
 */

export {
  isRequestExists,
  isValidTimeRange,
  isRequestBorrower,
  isRequestOwner,
  isRequestForUser
};
