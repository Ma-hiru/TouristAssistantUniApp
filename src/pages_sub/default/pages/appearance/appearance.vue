<template>
  <view class="h-screen w-screen grid grid-rows-[1fr_auto] grid-cols-1">
    <view class="flex justify-center items-center">
      <ChatAppearance />
    </view>
    <view class="p-12">
      <button
        @tap="chatStore.changeAppearance"
        class="p-2 flex justify-center items-center bg-[--diy-color-primary] text-white rounded-lg"
      >
        切换形象
      </button>
      <view :style="{ height: safeArea + 'px' }" class="w-screen" />
    </view>
  </view>
</template>

<script setup lang="ts">
import ChatAppearance from "@/components/ChatAppearance/ChatAppearance.vue";
import { useChatStore } from "@/stores/modules/useChatStore";

const chatStore = useChatStore();
const { safeArea } = uni.getWindowInfo();
</script>

<style scoped lang="scss"></style>
