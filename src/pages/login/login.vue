<template>
  <view class="h-screen w-screen flex justify-center items-center p-12">
    <view class="w-full">
      <wd-button :block="true" size="large" @tap="login">
        <text class="font-light">微信一键登录</text>
      </wd-button>
      <wd-divider> 其他登录方式</wd-divider>
      <view class="w-full flex flex-col justify-center items-center">
        <button
          class="border border-solid border-black w-10 h-10 rounded-full flex items-center justify-center"
          @tap="loginSuccess"
        >
          <wd-icon name="phone" size="22px"></wd-icon>
        </button>
        <text class="text-sm mt-1">模拟登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores";

const userStore = useUserStore();
const login = () => {
  uni.login({
    provider: "weixin",
    success: (res) => {
      userStore.loginInfo.code = res.code;
      uni.navigateTo({ url: "/pages/register/register" });
    },
  });
};

async function loginSuccess() {
  await uni.showToast({ icon: "success", title: "登录成功" });
  //TODO save userInfo
  setTimeout(() => uni.switchTab({ url: "/pages/index/index" }), 800);
}
</script>

<style scoped lang="scss"></style>
