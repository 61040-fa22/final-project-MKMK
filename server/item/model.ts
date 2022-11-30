import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

// Type definition for Item on the backend
export type Item = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  ownerId: Types.ObjectId;
  name: string;
  description: string;
  isAvailable: boolean;
};

// Mongoose schema definition for interfacing with a MongoDB table
const ItemSchema = new Schema<Item>({
  // The owner's userId
  ownerId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
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
  
});

const ItemModel = model<Item>('Item', ItemSchema);
export default ItemModel;