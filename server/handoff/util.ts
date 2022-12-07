import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Handoff, PopulatedHandoff} from './model';
import ItemCollection from '../item/collection';
import HandoffCollection from './collection';

type HandoffResponse = {
  _id: string;
  itemId: string;
  item: string;
  owner: string;
  borrower: string;
  startDate: string;
  returnDate: string;
  returned: boolean;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw handoff object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Handoff>} handoff - A handoff
 * @returns {handoffResponse} - The handoff object formatted for the frontend
 */
const constructHandoffResponse = async (handoff: HydratedDocument<Handoff>): Promise<HandoffResponse> => {
  const handoffPopulated = await HandoffCollection.findOne(handoff._id);
  const handoffCopy: PopulatedHandoff = {
    ...handoffPopulated.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  const ownerName = handoffCopy.ownerId.username;
  const borrowerName = handoffCopy.borrowerId.username;
  const item = await ItemCollection.findOne(handoffCopy.requestId.itemId);
  const itemName = item.name;
  delete handoffCopy.ownerId;
  delete handoffCopy.borrowerId;
  delete handoffCopy.requestId;

  return {
    ...handoffCopy,
    _id: handoffCopy._id.toString(),
    itemId: item._id.toString(),
    item: itemName,
    owner: ownerName,
    borrower: borrowerName,
    startDate: formatDate(handoff.startDate),
    returnDate: formatDate(handoff.returnDate)
  };
};

export {
  constructHandoffResponse
};
