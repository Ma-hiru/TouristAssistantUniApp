<template>
  <view class="w-screen h-screen p-12">
    <view class="w-full p-10 flex justify-center flex-col items-center">
      <view class="relative">
        <button
          class="rounded-full"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <ant-avatar :src="loginForm.avatar" size="large" class="avatar" />
        </button>
        <view class="mask rounded-full" v-if="!isChooseAvatar">设置头像</view>
      </view>
    </view>
    <wd-form ref="form">
      <wd-cell-group border>
        <input
          placeholder="请输入昵称"
          type="nickname"
          class="text-center"
          v-model="loginForm.nickname"
        />
      </wd-cell-group>
      <view class="mt-4 w-full">
        <wd-button type="primary" size="large" @click="handleSubmit" block>
          提交
        </wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { ButtonOnChooseavatar } from "@uni-helper/uni-app-types";
import type { loginInfo } from "@/api";
import { useUserStore } from "@/stores";
import { upload } from "@/api/modules/upload";

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
</style>
