import { Reaction } from '../reactions/reactions';
import { PublicUser } from '../user/public-user';

export interface Post {
  _id: string;
  title: string;
  text: string;
  author: PublicUser;
  categories: string[];
  reactions: Reaction[];
  files?: {
    url: string;
  }[];
  visibility: string;
  createdAt: Date;
}
