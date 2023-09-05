import { ReactionsNumber } from '../reactions-number';

export interface Post {
  _id: string;
  title: string;
  text: string;
  author: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
  };
  categories: string[];
  reactionsNumber: ReactionsNumber;
  files: {
    url: string;
  }[];
  createdAt: Date;
}
