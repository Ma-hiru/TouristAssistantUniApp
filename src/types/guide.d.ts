export type AntdMiniTapsCustomEventType = {
  detail: number;
};
export type PostCategoryDetail = {
  id: number;
  title: string;
  type?: string;
};
export type CommentDetail = {
  id: number;
  time: string;
  content: string;
  avatar: string;
  nickname: string;
};
export type PostCategoryList = PostCategoryDetail[];
export type CommentDetailList = CommentDetail[];
export type PostDetail = {
  id: number;
  title: string;
  content: string;
  avatar: string;
  nickname: string;
  cover: string;
  likes: number;
  position?: {
    id: number;
    name: string;
  };
  time: string;
  category: PostCategoryList;
  comments: CommentDetailList;
};
export type PostList = PostDetail[];
