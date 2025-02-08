import { defineStore } from "pinia";
import { ref } from "vue";

export const useGuideStore = defineStore("guideStore", () => {
  const createPostPoint = ref<{
    id: number;
    name: string;
  }>();
  return { createPostPoint };
});
