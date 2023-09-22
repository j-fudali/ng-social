import { Reaction } from '../reactions/reactions';

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
  reactions: Reaction[];
  files: {
    url: string;
  }[];
  createdAt: Date;
}
