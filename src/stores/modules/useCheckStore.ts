import { defineStore } from "pinia";
import { ref } from "vue";
import { CheckCard } from "@/types/check";

export const useCheckStore = defineStore("checkStore", () => {
  const items = [
    {
      id: 0,
      title: "心情",
    },
    {
      id: 1,
      title: "位置",
    },
    {
      id: 2,
      title: "分享",
    },
  ];
  const feelingText = ref("");
  const coverSrc = ref<string[]>([]);
  const tags = ref([
    {
      id: 1,
      title: "充实",
      type: "default",
    },
    {
      id: 2,
      title: "开心",
      type: "default",
    },
    {
      id: 3,
      title: "惊喜",
      type: "default",
    },
    {
      id: 4,
      title: "悠闲",
      type: "default",
    },
    {
      id: 5,
      title: "得意",
      type: "default",
    },
    {
      id: 6,
      title: "平静",
      type: "default",
    },
  ]);
  const temp = ref(0);
  const history = ref<CheckCard[]>([]);
  return {
    items,
    coverSrc,
    feelingText,
    tags,
    temp,
    history,
  };
});
