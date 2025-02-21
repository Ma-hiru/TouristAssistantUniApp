import { http } from "@/utils";
import { PostCategoryList, PostList } from "@/types/guide";
import { API } from "@/settings";

export const reqPostCategoryList = () =>
  http<PostCategoryList>({ url: API.GUIDE_CATEGORY, method: "GET" });
export const reqPostList = () =>
  http<PostList>({ url: API.GUIDE_POST_LIST, method: "GET" });
