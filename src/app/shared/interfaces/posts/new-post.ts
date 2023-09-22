export interface NewPost {
  title: string;
  text: string;
  categories: string[];
  visibility: string;
  files: FileList;
}
