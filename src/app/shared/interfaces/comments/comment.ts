import { ReactionsNumber } from '../reactions-number';
import { PublicUser } from '../user/public-user';
import { Post } from '../posts/post';

export interface Comment {
  _id: string;
  text: string;
  author: PublicUser;
  reactionsNumber: ReactionsNumber;
  image: string;
}
