import type {HydratedDocument, Types} from 'mongoose';
import type {Entry} from './model';
import EntryModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore entries
 * stored in MongoDB, including adding, finding, updating, and deleting entries.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Entry> is the output of the EntryModel() constructor,
 * and contains all the information in Entry. https://mongoosejs.com/docs/typescript.html
 */
class EntryCollection {
  /**
   * Add a entry to the collection
   *
   * @param {string} authorId - The id of the author of the entry
   * @param {string} content - The id of the content of the entry
   * @return {Promise<HydratedDocument<Entry>>} - The newly created entry
   */
  static async addOne(authorId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Entry>> {
    const date = new Date();
    const entry = new EntryModel({
      authorId,
      dateCreated: date,
      content
    });
    await entry.save(); // Saves entry to MongoDB
    return entry.populate('authorId');
  }

  /**
   * Find a entry by entryId
   *
   * @param {string} entryId - The id of the entry to find
   * @return {Promise<HydratedDocument<Entry>> | Promise<null> } - The entry with the given entryId, if any
   */
  static async findOne(entryId: Types.ObjectId | string): Promise<HydratedDocument<Entry>> {
    return EntryModel.findOne({_id: entryId}).populate('authorId');
  }

  /**
   * Get all the entries in the database
   *
   * @return {Promise<HydratedDocument<Entry>[]>} - An array of all of the entries
   */
  static async findAll(): Promise<Array<HydratedDocument<Entry>>> {
    // Retrieves entries and sorts them from most to least recent
    return EntryModel.find({}).sort({dateCreated: -1}).populate('authorId');
  }

  /**
   * Get all the entries in by given author
   *
   * @param {string} username - The username of author of the entries
   * @return {Promise<HydratedDocument<Entry>[]>} - An array of all of the entries
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Entry>>> {
    const author = await UserCollection.findOneByUsername(username);
    return EntryModel.find({authorId: author._id}).sort({dateCreated: -1}).populate('authorId');
  }


  /**
   * TO DO after Item is done: Get all the entries by item. 
   *
   * @param {Types.ObjectId} item - itemId 
   * @return {Promise<HydratedDocument<Entry>[]>} - An array of all of the entries
   */
    /*
     static async findAllByItem(itemId: Types.ObjectId): Promise<Array<HydratedDocument<Entry>>> {
      const item = await ItemCollection.findOneByItemId(itemId);
      return EntryModel.find({itemId: item._id}).sort({dateCreated: -1}).populate('itemId');
    }
    */
  
  /**
   * Update a entry with the new content
   *
   * @param {string} entryId - The id of the entry to be updated
   * @param {string} content - The new content of the entry
   * @return {Promise<HydratedDocument<Entry>>} - The newly updated entry
   */
  static async updateOne(entryId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Entry>> {
    const entry = await EntryModel.findOne({_id: entryId});
    entry.content = content;
    await entry.save();
    return entry.populate('authorId');
  }

  /**
   * Delete a entry with given entryId.
   *
   * @param {string} entryId - The entryId of entry to delete
   * @return {Promise<Boolean>} - true if the entry has been deleted, false otherwise
   * 
   */
  static async deleteOne(entryId: Types.ObjectId | string): Promise<boolean> {
    const entry = await EntryModel.deleteOne({_id: entryId});
    return entry !== null;
  }

  /**
   * Delete all the entries by the given author
   *
   * @param {string} authorId - The id of author of entries
   */
  static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await EntryModel.deleteMany({authorId});
  }
}

export default EntryCollection;
