<template>
  <view>
    <view class="w-screen h-screen p-12">
      <view class="w-full flex justify-center flex-col items-center">
        <view class="relative">
          <button
            class="rounded-full"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar"
          >
            <image
              :src="loginForm.avatar"
              :style="{ height: '6rem', width: '6rem' }"
            />
          </button>
          <view class="mask rounded-full" v-if="!isChooseAvatar">设置头像</view>
        </view>
      </view>
      <view class="mt-8 flex justify-center">
        <input
          placeholder="请输入昵称"
          type="nickname"
          class="text-center"
          v-model="loginForm.nickname"
        />
      </view>
    </view>
    <view
      class="fixed text-[--diy-color-primary] text-center w-screen p-12 pb-4"
      :style="{ bottom: safeAreaInsets.bottom + 'px' }"
    >
      <button
        class="w-full h-12 leading-4 bg-[var(--diy-color-primary)] flex justify-center items-center rounded-lg text-white"
        hover-class="btn-hover"
        @tap="handleSubmit"
      >
        <text class="font-medium text-base"> 注册</text>
      </button>
      <button class="bg-none inline-block button-clear mt-8">
        《用户协议》
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { ButtonOnChooseavatar } from "@uni-helper/uni-app-types";
import type { loginInfo } from "@/types/api";
import { useUserStore } from "@/stores";
import { upload } from "@/api/modules/upload";
import { useChatStore } from "@/stores/modules/useChatStore";

const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const userStore = useUserStore();
const loginForm = ref<loginInfo>({
  code: userStore.loginInfo.code,
  nickname: "",
  avatar: "",
});
const defaultAvatarUrl = ref<string>("");
const isChooseAvatar = ref<boolean>(false);
const onChooseAvatar: ButtonOnChooseavatar = (e) => {
  console.log(e);
  const { avatarUrl: Url } = e.detail;
  loginForm.value.avatar = Url;
  isChooseAvatar.value = true;
};
onLoad(() => {
  uni.getUserInfo({
    provider: "weixin",
    success: function (infoRes) {
      loginForm.value.avatar = infoRes.userInfo.avatarUrl;
      defaultAvatarUrl.value = infoRes.userInfo.avatarUrl;
    },
  });
});
const handleSubmit = () => {
  if (loginForm.value.nickname === "") {
    uni.showToast({
      title: "昵称不能为空！",
      icon: "none",
    });
    return;
  } else if (loginForm.value.nickname!.length > 10) {
    uni.showToast({
      title: "昵称太长了，换个吧~",
      icon: "none",
    });
    return;
  } else if (loginForm.value.avatar === defaultAvatarUrl.value) {
    uni.showToast({
      title: "请设置头像！",
      icon: "none",
    });
    return;
  }
  const chatStore = useChatStore();
  chatStore.loginInfo.avatar = loginForm.value.avatar!;
  chatStore.loginInfo.nickname = loginForm.value.nickname!;
  //TODO 压缩图像 大小限制
  upload({
    url: "/api/upload",
    filePath: loginForm.value.avatar,
    name: "avatar",
    formData: {
      nickname: loginForm.value.nickname,
      code: loginForm.value.code,
    },
    success: (res) => {
      console.log(res.data);
    },
  });
  uni.showToast({ icon: "success", title: "登录成功" });
  setTimeout(() => uni.switchTab({ url: "/pages/index/index" }), 1000);
};
</script>

<style scoped lang="scss">
.mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 10;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.button-clear {
  &::after {
    border: none;
  }
}
</style>
