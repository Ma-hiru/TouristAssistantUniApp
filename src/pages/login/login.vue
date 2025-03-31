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
        <uni-icons type="weixin" size="2rem" color="#fff" class="mr-1" />
        <text class="font-medium text-base">微信一键登录</text>
      </button>
      <ant-divider text="其他登录方式" lineColor="#333" />
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
import { reqLogin } from "@/api";
import { reqURL } from "@/settings";

const userStore = useUserStore();
const login = () => {
  uni.showToast({
    title: "登录中",
    icon: "loading",
    mask: true,
  });
  uni.login({
    provider: "weixin",
    success: async (res) => {
      userStore.loginInfo.code = res.code;
      try {
        const data = await reqLogin({ code: res.code });
        if (!data.result.isFirst) {
          userStore.userProfile.nickname = data.result.nickname!;
          userStore.userProfile.token = data.result.token!;
          userStore.userProfile.avatar = reqURL + data.result.avatar!;
          uni.getUserInfo({
            provider: "weixin",
            success: function (infoRes) {
              userStore.userProfile.avatar = infoRes.userInfo.avatarUrl;
            },
          });
          loginSuccess().then();
        } else
          await uni.navigateTo({
            url: "/pages_sub/default/pages/register/register",
          });
      } catch {
        /*empty*/
      }
    },
    fail: () => {
      uni.showToast({
        title: "获取微信信息失败",
        icon: "none",
      });
    },
  });
};
const loginSuccess = async () => {
  await uni.showToast({ icon: "success", title: "登录成功" });
  setTimeout(() => uni.switchTab({ url: "/pages/chat/chat" }), 800);
};
</script>

<style scoped lang="scss">
.wallpaper {
  background-image: $login-bg-url;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
