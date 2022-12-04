import type {HydratedDocument, Types} from 'mongoose';
import ItemModel from './model';
import type {Item} from './model';

class ItemCollection {
  /**
   * Add an item to the collection
   *
   * @param {string} ownerId - The id of the owner of the item
   * @param {string} name - The name of the item
   * @param {string} description - A description of the item
   * @return {Promise<HydratedDocument<Item>>} - The newly created item
   */
  static async addOne(ownerId: Types.ObjectId | string, name: string, description: string): Promise<HydratedDocument<Item>> {
    const isAvailable = false;
    const item = new ItemModel({
      ownerId,
      name,
      description,
      isAvailable
    });
    await item.save();
    return item;
  }

  /**
   * Find an item by itemId
   *
   * @param {string} itemId - The id of the item to find
   * @return {Promise<HydratedDocument<Item>> | Promise<null> } - The item with the given itemId, if any
   */
  static async findOne(itemId: Types.ObjectId | string): Promise<HydratedDocument<Item>> {
    return ItemModel.findOne({_id: itemId});
  }

  /**
   * Get all the items owned by the user
   *
   * @param {string} ownerId - The id of the owner of the items to find
   * @return {Promise<HydratedDocument<Item>[]>} - An array of all of the items
   */
  static async findAllByOwnerId(ownerId: Types.ObjectId | string): Promise<Array<HydratedDocument<Item>>> {
    return ItemModel.find({ownerId});
  }

  /**
   * Update a item with the new content
   *
   * @param {string} itemId - The id of the item to be updated
   * @param {string} name - The new name of the item, if any
   * @param {string} description - The new description for the item, if any
   * @return {Promise<HydratedDocument<Item>>} - The newly updated item
   */
  static async updateOne(itemId: Types.ObjectId | string, name: string, description: string): Promise<HydratedDocument<Item>> {
    const item = await ItemModel.findOne({_id: itemId});
    if (name !== '') {
      item.name = name;
    }

    if (description !== '') {
      item.description = description;
    }

    await item.save();
    return item;
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
   * Delete all the items owned by the given owner
   *
   * @param {string} ownerId - The id of the owner of items
   */
  static async deleteMany(ownerId: Types.ObjectId | string): Promise<void> {
    await ItemModel.deleteMany({ownerId});
  }
}

export default ItemCollection;
