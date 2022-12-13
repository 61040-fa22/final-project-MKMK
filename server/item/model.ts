import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type { User } from 'server/user/model';

// Type definition for Item on the backend
export type Item = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  ownerId: Types.ObjectId;
  name: string;
  description: string;
  isAvailable: boolean;
  imageRef: string;
};

export type PopulatedItem = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  ownerId: User;
  name: string;
  description: string;
  isAvailable: boolean;
  imageRef: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
const ItemSchema = new Schema<Item>({
  // The owner's userId
  ownerId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The name of the item
  name: {
    type: String,
    required: true
  },
  // The item's description
  description: {
    type: String,
    required: true
  },
  // The current availability of the item
  isAvailable: {
    type: Boolean,
    required: true
  },
  // A reference to the item's photo in firebase
  imageRef: {
    type: String,
    default: null
  }
});

const ItemModel = model<Item>('Item', ItemSchema);
export default ItemModel;
