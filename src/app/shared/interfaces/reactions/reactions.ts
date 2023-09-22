import { PublicUser } from '../user/public-user';

export interface Reaction {
  _id: string;
  reaction: string;
  author: PublicUser;
}
