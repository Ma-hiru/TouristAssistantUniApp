import { defineStore } from "pinia";
import { ref } from "vue";

export const useShareStore = defineStore("shareStore", () => {
  const coverSrc = ref<string[]>([]);
  const feelingText = ref("");
  return {
    coverSrc,
    feelingText,
  };
});
