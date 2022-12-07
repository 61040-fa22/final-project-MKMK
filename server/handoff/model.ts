import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Request} from '../request/model';

// Type definition for handoff on the backend
export type Handoff = {
  _id: Types.ObjectId;
  requestId: Types.ObjectId;
  ownerId: Types.ObjectId;
  borrowerId: Types.ObjectId;
  startDate: Date;
  returnDate: Date;
  returned: boolean;
  ownerReturnClaim: Date;
  borrowerReturnClaim: Date;
};

export type PopulatedHandoff = {
  _id: Types.ObjectId;
  requestId: Request;
  ownerId: User;
  borrowerId: User;
  startDate: Date;
  returnDate: Date;
  returned: boolean;
  ownerReturnClaim: Date;
  borrowerReturnClaim: Date;
};

const HandoffSchema = new Schema<Handoff>({
  // The ID of the request associated with this handoff
  requestId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Request'
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
  returnDate: {
    type: Date,
    required: true
  },
  // Whether or not the item has been returned
  returned: {
    type: Boolean,
    default: false
  },
  // Date the owner marked item as being returned
  ownerReturnClaim: {
    type: Date,
    default: null
  },
  // Date the borrower marked item as being returned
  borrowerReturnClaim: {
    type: Date,
    default: null
  }
});

const HandoffModel = model<Handoff>('Handoff', HandoffSchema);
export default HandoffModel;
