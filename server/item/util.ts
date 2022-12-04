import type {HydratedDocument} from 'mongoose';
import type {Item, PopulatedItem} from '../item/model';

type ItemResponse = {
  _id: string;
  owner: string;
  name: string;
  description: string;
  isAvailable: boolean;
};

/**
 * Transform a raw Item object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Item>} item - An item
 * @returns {ItemResponse} - The item object formatted for the frontend
 */
const constructItemResponse = (item: HydratedDocument<Item>): ItemResponse => {
  const itemCopy: PopulatedItem = {
      ...item.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const owner = itemCopy.ownerId.username;
  delete itemCopy.ownerId;
  return {
    ...itemCopy,
    _id: itemCopy._id.toString(),
    owner: owner,
    name: itemCopy.name,
    description: itemCopy.description,
    isAvailable: itemCopy.isAvailable
  };
};

export {
  constructItemResponse
};
