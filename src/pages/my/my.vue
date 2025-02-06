<template>
  <view class="w-screen h-screen p-4 pt-0 relative">
    <view
      class="relative w-[calc(100%+2rem)] -left-4 user-card p-4 pb-0 rounded-b-md"
      :style="{ paddingTop: `${safeAreaInsets!.top}px` }"
    >
      <view class="mt-16 relative top-8">
        <uni-card margin="0" padding="0" spacing="0">
          <view
            class="w-full h-full flex justify-center items-center flex-col pt-4 pb-4"
            @tap="isLogin"
          >
            <ant-avatar class="z-10" size="medium" :src="avatarSrc" />
            <text class="text-black mt-4 font-bold">
              {{ username }}
            </text>
          </view>
        </uni-card>
      </view>
    </view>
    <view class="w-[calc(100%-2rem)] left-4 absolute bottom-4">
      <view class="text-center mb-2 text-[--diy-color-primary]" @tap="feedback">
        <text>遇到问题？点我反馈</text>
      </view>
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
  </view>
</template>
<script setup lang="ts" name="my">
import { useChatStore } from "@/stores/modules/useChatStore";

const { safeAreaInsets } = uni.getSystemInfoSync();
import { computed, ref } from "vue";

const chatStore = useChatStore();
const inputDialog = ref();
const feedbackText = ref("");
const avatarSrc = computed(() => {
  return chatStore.loginInfo.avatar || "/static/user/avatar_default.jpg";
});
const username = computed(() => {
  return chatStore.loginInfo.nickname || "请登录";
});
const feedback = () => {
  inputDialog.value.open("center");
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
  if (username.value === "请登录") {
    uni.navigateTo({ url: "/pages/login/login" });
  }
};
const logout = () => {
  chatStore.loginInfo = {
    nickname: "",
    avatar: "",
    code: "",
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
