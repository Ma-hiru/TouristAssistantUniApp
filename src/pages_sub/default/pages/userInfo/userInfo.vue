<template>
  <view class="w-screen h-screen bg-gray-100 p-2">
    <view class="bg-white p-2 pt-4 items-center flex justify-between">
      <text>头像</text>
      <ant-avatar :src="userStore.userProfile.avatar" size="small" />
    </view>
    <view class="bg-white p-2 pb-4 items-center flex justify-between">
      <text>昵称</text>
      <text>{{ userStore.userProfile.nickname || "请登录" }}</text>
    </view>
    <button
      class="bg-white p-2 pt-4 pb-4 mt-2 flex justify-start clear-btn"
      open-type="openSetting"
    >
      <text>授权管理</text>
    </button>
    <button
      class="bg-white p-2 pt-4 pb-4 flex justify-start clear-btn"
      open-type="contact"
    >
      <text>联系我们</text>
    </button>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores";

const userStore = useUserStore();
</script>

<style scoped lang="scss"></style>
