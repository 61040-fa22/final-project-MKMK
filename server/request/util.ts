import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Request, PopulatedRequest} from './model';

type RequestResponse = {
  _id: string;
  item: string;
  owner: string;
  borrower: string;
  startDate: string;
  endDate: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY');

/**
 * Transform a raw request object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Request>} request - A request
 * @returns {RequestResponse} - The request object formatted for the frontend
 */
const constructRequestResponse = (request: HydratedDocument<Request>): RequestResponse => {
  const requestCopy: PopulatedRequest = {
    ...request.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  const ownerName = requestCopy.ownerId.username;
  const borrowerName = requestCopy.borrowerId.username;
  const itemName = requestCopy.itemId.name;

  delete requestCopy.ownerId;
  delete requestCopy.borrowerId;
  delete requestCopy.itemId;

  return {
    ...requestCopy,
    _id: requestCopy._id.toString(),
    item: itemName,
    owner: ownerName,
    borrower: borrowerName,
    startDate: formatDate(request.startDate),
    endDate: formatDate(request.endDate)
  };
};

export {
  constructRequestResponse
};
