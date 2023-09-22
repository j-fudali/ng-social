import { Reaction } from '../reactions/reactions';
import { PublicUser } from '../user/public-user';

export interface Comment {
  _id: string;
  text: string;
  author: PublicUser;
  reactions: Reaction[];
  image: string;
}
