import { defineStore } from "pinia";
import { ref } from "vue";
import type { LoginInfo, UserProfile } from "@/types/api";
import { PointList } from "@/types/map";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const loginInfo = ref<LoginInfo>({
      code: "",
    });
    const userProfile = ref<UserProfile>({
      token: "",
      nickname: "",
      avatar: "",
    });
    const starPoint = ref<PointList>([]);
    return {
      loginInfo,
      userProfile,
      starPoint,
    };
  },
  {
    // persist: {
    //   storage: {
    //     getItem(key) {
    //       return uni.getStorageSync(key);
    //     },
    //     setItem(key, value) {
    //       uni.setStorageSync(key, value);
    //     },
    //   },
    // },
  }
);
