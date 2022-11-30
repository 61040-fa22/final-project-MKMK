import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

// Type definition for Rating on the backend
export type Rating = {
  _id: Types.ObjectId;
  handoffId: Types.ObjectId;
  ownerId: Types.ObjectId;
  borrowerId: Types.ObjectId;
  ownerRating: number;
  borrowerRating: number;
};

const RatingSchema = new Schema<Rating>({
  // The ID of the Handoff being rated
  handoffId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Handoff'
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  borrowerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The rating for the owner of the item borrowed
  ownerRating: {
    type: Number
  },
  // The rating for the borrow of the item
  borrowerRating: {
    type: Number
  }
});

const RatingModel = model<Rating>('Rating', RatingSchema);
export default RatingModel;
