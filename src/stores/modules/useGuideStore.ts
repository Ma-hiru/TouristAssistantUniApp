import { defineStore } from "pinia";
import { ref } from "vue";
import { CommentDetail, PostCategoryList, PostList } from "@/types/guide";

export const useGuideStore = defineStore("guideStore", () => {
  const createPostPoint = ref<{
    id: number;
    name: string;
  }>();
  const postList = ref<PostList>([
    {
      id: 1,
      title: "测试帖子",
      content: "test",
      time: "2025-02-09",
      avatar:
        "https://i1.hdslb.com/bfs/face/3a59c98c91d0e14d0a965e45577e6f5f7e73c6ce.jpg@96w_96h_1c_1s.avif",
      nickname: "八奈见杏菜",
      cover: "https://shiina-mahiru.cn/download/user_bg.png",
      likes: 1200,
      position: {
        id: 1,
        name: "地点一",
      },
      category: [
        {
          id: 1,
          title: "推荐",
        },
        {
          id: 2,
          title: "攻略",
        },
      ],
      comments: [
        {
          id: 1,
          time: "2025-02-09",
          content: "这是一条善意的评论。",
          avatar:
            "https://i1.hdslb.com/bfs/face/3a59c98c91d0e14d0a965e45577e6f5f7e73c6ce.jpg@96w_96h_1c_1s.avif",
          nickname: "椎名真昼",
        },
      ],
    },
    {
      id: 2,
      title: "测试帖子2",
      time: "2025-02-09",
      content: "tes2",
      position: {
        id: 2,
        name: "地点二",
      },
      avatar:
        "https://i1.hdslb.com/bfs/face/3a59c98c91d0e14d0a965e45577e6f5f7e73c6ce.jpg@96w_96h_1c_1s.avif",
      nickname: "椎名真昼",
      cover: "https://shiina-mahiru.cn/download/user_bg.png",
      likes: 999,
      category: [
        {
          id: 1,
          title: "推荐",
        },
      ],
      comments: [],
    },
  ]);
  const postCategoryList = ref<PostCategoryList>([
    {
      id: 1,
      title: "推荐",
    },
    {
      id: 2,
      title: "攻略",
    },
    {
      id: 3,
      title: "自拍",
    },
    {
      id: 4,
      title: "交友",
    },
    {
      id: 5,
      title: "美食",
    },
  ]);
  const sendComment = (comment: CommentDetail, index: number) => {
    postList.value[index].comments.push(comment);
  };
  return { createPostPoint, postList, postCategoryList, sendComment };
});
