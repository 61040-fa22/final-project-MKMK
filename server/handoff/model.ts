import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for Handoff on the backend
export type Handoff = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  itemId: Types.ObjectId;
  ownerId: Types.ObjectId;
  borrowerId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  accepted: boolean;
};

const HandoffSchema = new Schema<Handoff>({
  // The ID of the Item being borrowed
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Item'
  },
  // The ID of the owner of the item
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The ID of the borrower of the item
  borrowerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The start date of the borrowing period
  startDate: {
    type: Date,
    required: true
  },
  // The end date of the borrowing period
  endDate: {
    type: Date,
    required: true
  },
  // Whether or not the borrow request was accepted by the owner
  // null if request has not been responded to
  accepted: {
    type: Boolean
  }
});

const HandoffModel = model<Handoff>('Handoff', HandoffSchema);
export default HandoffModel;
