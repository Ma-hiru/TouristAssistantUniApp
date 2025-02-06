import { defineStore } from "pinia";
import { ref } from "vue";
import type { loginInfo, userProfile } from "@/types/api";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const loginInfo = ref<loginInfo>({
      nickname: "",
      avatar: "",
      code: "",
    });
    const profile = ref<userProfile>({
      token: "",
      nickname: "",
      avatar: "",
    });
    return {
      loginInfo,
      profile,
    };
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
    },
  }
);
