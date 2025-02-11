<template>
  <view class="w-screen h-screen">
    <view
      class="relative w-[calc(100%+2rem)] -left-4 user-card p-4 pb-8 rounded-b-md"
      :style="{ paddingTop: `${safeAreaInsets!.top}px` }"
    >
      <view
        class="w-full h-full flex justify-center items-center flex-col pt-4 pb-4"
        @tap="isLogin"
      >
        <ant-avatar class="z-10" size="medium" :src="avatarSrc" />
        <text class="text-white mt-4 font-bold">
          {{ username }}
        </text>
      </view>
    </view>
    <view class="pl-2 pr-2 -mt-8">
      <uni-card margin="0" padding="0.5rem">
        <view class="flex justify-between">
          <button
            @tap="handleStar"
            class="flex flex-col clear-btn items-center justify-center p-2"
          >
            <image
              src="/static/user/star.svg"
              :style="{ height: '2rem', width: '2rem' }"
            />
            <text>收藏地点</text>
          </button>
          <button
            open-type="feedback"
            class="flex flex-col clear-btn items-center justify-between p-2 pt-[0.8rem]"
          >
            <image
              src="/static/user/feedback.svg"
              :style="{ height: '1.5rem', width: '1.5rem' }"
            />
            <text>问题反馈</text>
          </button>
          <button
            @tap="userInfo"
            class="flex flex-col clear-btn items-center justify-center p-2 pt-3"
          >
            <image
              src="/static/user/userInfo.svg"
              :style="{ height: '2rem', width: '2rem' }"
            />
            <text>个人信息</text>
          </button>
        </view>
      </uni-card>
    </view>
  </view>
  <view class="w-[calc(100%-2rem)] left-4 fixed bottom-4">
    <button
      class="w-full h-12 logout-btn flex justify-center items-center bg-none text-red-600"
      @tap="logout"
    >
      退出登录
    </button>
  </view>
  <uni-popup
    ref="inputDialog"
    type="dialog"
    mask-background-color="rgba(0,0,0,0.4)"
  >
    <uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="反馈"
      v-model="feedbackText"
      placeholder="描述你遇到的问题"
      @confirm="dialogInputConfirm"
      @close="feedbackText = ''"
    />
  </uni-popup>
</template>
<script setup lang="ts" name="my">
import { computed, ref } from "vue";
import { useUserStore } from "@/stores";

const { safeAreaInsets } = uni.getSystemInfoSync();
const userStore = useUserStore();
const inputDialog = ref();
const feedbackText = ref("");
const avatarSrc = computed(() => {
  return userStore.userProfile.avatar || "/static/user/avatar_default.jpg";
});
const username = computed(() => {
  return userStore.userProfile.nickname || "点击登录";
});
const feedback = () => {
  inputDialog.value.open("center");
};
const userInfo = () => {
  uni.navigateTo({ url: "/pages_sub/default/userInfo/userInfo" });
};
const handleStar = () => {
  uni.navigateTo({
    url: "/pages_sub/default/pages/point/point?mode=star",
  });
};
const dialogInputConfirm = () => {
  if (feedbackText.value === "") {
    uni.showToast({
      title: "请输入反馈内容",
      icon: "none",
    });
  } else {
    uni.showToast({
      title: "反馈成功",
      icon: "none",
    });
    feedbackText.value = "";
  }
};
const isLogin = () => {
  if (username.value !== userStore.userProfile.nickname) {
    uni.navigateTo({ url: "/pages/login/login" });
  }
};
const logout = () => {
  userStore.userProfile = {
    nickname: "",
    avatar: "",
    token: "",
  };
  uni.navigateTo({ url: "/pages/login/login" });
};
</script>
<style lang="scss" scoped>
.logout-btn {
  border: red solid 1px;

  &::after {
    border: none;
  }
}

.user-card {
  background-image: url("https://shiina-mahiru.cn/download/user_bg.png");
}
</style>
