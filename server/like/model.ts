import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

// Type definition for Like on the backend
export type Like = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  liker: Types.ObjectId;
  liked: Types.ObjectId;
};

const LikeSchema = new Schema({
  // The user doing the like
  liker: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The ID of the entry being liked
  liked: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const LikeModel = model<Like>('Like', LikeSchema);
export default LikeModel;
