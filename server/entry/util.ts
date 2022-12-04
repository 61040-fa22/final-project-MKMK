import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Entry, PopulatedEntry} from './model';

// Update this if you add a property to the Entry type!
type EntryResponse = {
  _id: string;
  author: string;
  dateCreated: string;
  content: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Entry object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Entry>} entry - A entry
 * @returns {EntryResponse} - The entry object formatted for the frontend
 */
const constructEntryResponse = (entry: HydratedDocument<Entry>): EntryResponse => {
  const entryCopy: PopulatedEntry = {
    ...entry.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const {username} = entryCopy.authorId;
  delete entryCopy.authorId;
  return {
    ...entryCopy,
    _id: entryCopy._id.toString(),
    author: username,
    dateCreated: formatDate(entry.dateCreated)
  };
};

export {
  constructEntryResponse
};
