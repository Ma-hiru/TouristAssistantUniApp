<template>
  <view
    class="h-screen w-screen flex justify-end items-center p-12 wallpaper flex-col pb-48"
  >
    <view class="w-full">
      <button
        class="w-full h-12 leading-4 bg-[var(--diy-color-primary)] flex justify-center items-center rounded-lg text-white"
        hover-class="btn-hover"
        @tap="login"
      >
        <text class="font-medium text-base">微信一键登录</text>
      </button>
      <wd-divider> 其他登录方式</wd-divider>
      <view class="w-full flex flex-col justify-center items-center">
        <button
          class="border border-solid border-black w-10 h-10 rounded-full flex items-center justify-center"
          @tap="loginSuccess"
        >
          <wd-icon name="phone" size="22px"></wd-icon>
        </button>
        <text class="text-sm mt-1">手机号登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores";

const userStore = useUserStore();
const login = () => {
  uni.showToast({
    title: "登录中",
    icon: "loading",
    mask: true,
  });
  uni.login({
    provider: "weixin",
    success: (res) => {
      userStore.loginInfo.code = res.code;
      //TODO 判断是否需要昵称头像
      uni.navigateTo({ url: "/pages/register/register" });
    },
    fail: () => {
      uni.showToast({
        title: "获取微信信息失败",
        icon: "none",
      });
    },
  });
};

async function loginSuccess() {
  await uni.showToast({ icon: "success", title: "登录成功" });
  //TODO save userInfo
  // setTimeout(() => uni.switchTab({ url: "/pages/index/index" }), 800);
}
</script>

<style scoped lang="scss">
.wallpaper {
  background-image: url("https://shiina-mahiru.cn/download/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
