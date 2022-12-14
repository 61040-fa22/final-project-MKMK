import type {HydratedDocument, Types} from 'mongoose';
import type {Item} from './model';
import ItemModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore items
 * stored in MongoDB.
 */
class ItemCollection {
  /**
   * Add a item to the collection
   *
   * @param {string} ownerId - The id of the owner of the item
   * @param {string} name - The name/title of the item
   * @param {string} description - The description of the item
   * @param {string} imageRef - A url referencing the image in firebase
   * @return {Promise<HydratedDocument<Item>>} - The newly created item
   */
  static async addOne(ownerId: Types.ObjectId | string, name: string, description: string, imageRef =''): Promise<HydratedDocument<Item>> {
    if (imageRef.length === 0) {
      imageRef = null;
    }
    
    const item = new ItemModel({
      ownerId,
      name, 
      description, 
      isAvailable: true,
      imageRef
    });
    await item.save(); // Saves item to MongoDB
    return item.populate('ownerId');
  }

  /**
   * Find an item by its id
   *
   * @param {string} itemId - The id of the item to find
   * @return {Promise<HydratedDocument<Item>> | Promise<null> } - The item with the given itemId, if any
   */
  static async findOne(itemId: Types.ObjectId | string): Promise<HydratedDocument<Item>> {
    return ItemModel.findOne({_id: itemId}).populate('ownerId');
  }

  /**
   * Get all the items in the database
   *
   * @return {Promise<HydratedDocument<Item>[]>} - An array of all of the items
   */
  static async findAll(): Promise<Array<HydratedDocument<Item>>> {
    // Retrieves items
    return ItemModel.find({}).populate('ownerId');
  }

  /**
   * Get all the items owned by given user
   *
   * @param {string} username - The username of owner of the items
   * @return {Promise<HydratedDocument<Item>[]>} - An array of all of the items
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Item>>> {
    const owner = await UserCollection.findOneByUsername(username);
    return ItemModel.find({ownerId: owner._id}).populate('ownerId');
  }

  /**
   * Update an item with a new name
   *
   * @param {string} itemId - The id of the item to be updated
   * @param {string} name - The new name of the item
   * @return {Promise<HydratedDocument<Item>>} - The newly updated item
   */
  static async updateOneName(itemId: Types.ObjectId | string, name: string): Promise<HydratedDocument<Item>> {
    const item = await ItemModel.findOne({_id: itemId});
    item.name = name;
    await item.save();
    return item.populate('ownerId');
  }

  /**
   * Update an item with a new description
   *
   * @param {string} itemId - The id of the item to be updated
   * @param {string} description - The new description of the item
   * @return {Promise<HydratedDocument<Item>>} - The newly updated item
   */
   static async updateOneDescription(itemId: Types.ObjectId | string, description: string): Promise<HydratedDocument<Item>> {
    const item = await ItemModel.findOne({_id: itemId});
    item.description = description;
    await item.save();
    return item.populate('ownerId');
  }

  /**
   * Update an item with a new image ref
   *
   * @param {string} itemId - The id of the item to be updated
   * @param {string} imageRef - the url referencing the image in firebase
   * @param {Promise<HydratedDocument<Item>>} - The newly updated item
   */
   static async updateOneImage(itemId: Types.ObjectId | string, imageRef: string): Promise<HydratedDocument<Item>> {
    const item = await ItemModel.findOne({_id: itemId});
    item.imageRef = imageRef;
    await item.save();
    return item.populate('ownerId');
  }


  /**
   * Toggle an item's availability
   *
   * @param {string} itemId - The id of the item to be updated
   * @return {Promise<HydratedDocument<Item>>} - The newly updated item
   */
   static async updateOneAvailability(itemId: Types.ObjectId | string): Promise<HydratedDocument<Item>> {
    const item = await ItemModel.findOne({_id: itemId});
    item.isAvailable = !item.isAvailable;
    await item.save();
    return item.populate('ownerId');
  }

  /**
   * Delete an item with given itemId.
   *
   * @param {string} itemId - The itemId of item to delete
   * @return {Promise<Boolean>} - true if the item has been deleted, false otherwise
   */
  static async deleteOne(itemId: Types.ObjectId | string): Promise<boolean> {
    const item = await ItemModel.deleteOne({_id: itemId});
    return item !== null;
  }

  /**
   * Delete all the items by the given owner
   *
   * @param {string} ownerId - The id of owner of items
   */
  static async deleteMany(ownerId: Types.ObjectId | string): Promise<void> {
    await ItemModel.deleteMany({ownerId});
  }
}

export default ItemCollection;
