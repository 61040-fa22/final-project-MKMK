import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Entry
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Entry on the backend
export type Entry = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  itemId: Types.ObjectId;
  authorId: Types.ObjectId;
  dateCreated: Date;
  content: string;
};

export type PopulatedEntry = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  itemId: Types.ObjectId;
  authorId: User;
  dateCreated: Date;
  content: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Entrys stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const EntrySchema = new Schema<Entry>({
  // The author userId
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  itemId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date the entry was created
  dateCreated: {
    type: Date,
    required: true
  },
  // The content of the entry
  content: {
    type: String,
    required: true
  },
});

const EntryModel = model<Entry>('Entry', EntrySchema);
export default EntryModel;
