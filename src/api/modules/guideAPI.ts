import { http } from "@/utils";
import { PostCategoryList, PostList } from "@/types/guide";

enum API {
  CATEGORY = "/wechat/category",
  POST_LIST = "/wechat/postList",
}
export const reqPostCategoryList = () =>
  http<PostCategoryList>({ url: API.CATEGORY, method: "GET" });
export const reqPostList = () =>
  http<PostList>({ url: API.POST_LIST, method: "GET" });
