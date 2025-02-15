import { defineStore } from "pinia";
import { ref } from "vue";

export const useShareStore = defineStore("shareStore", () => {
  const coverSrc = ref<string[]>([]);
  const feelingText = ref("");
  const items = ref([
    {
      title: "步骤一",
      description: "上传图片",
    },
    {
      title: "步骤二",
      description: "写下感受",
    },
    {
      title: "步骤三",
      description: "生成游记",
    },
  ]);
  return {
    coverSrc,
    feelingText,
    items,
  };
});
