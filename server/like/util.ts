import type {HydratedDocument, Types} from 'mongoose';
import moment from 'moment';
import type {Like} from './model';

type LikeResponse = {
  _id: string;
  liker: string;
  liked: string;
};

/**
 * Transform a raw Like object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Like>} like - A like object
 * @returns {LikeResponse} - The like object
 */
const constructLikeResponse = (like: HydratedDocument<Like>): LikeResponse => {
  const likeCopy: Like = {
    ...like.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    ...likeCopy,
    _id: likeCopy._id.toString(),
    liker: likeCopy.liker.toString(),
    liked: likeCopy.liked.toString()
  };
};

export {
  constructLikeResponse
};
