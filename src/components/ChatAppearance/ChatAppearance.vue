<template>
  <view class="w-screen flex justify-center">
    <image
      :src="chatStore.appearanceList[chatStore.appearanceIndex]"
      style="width: 65%"
      mode="widthFix"
    />
  </view>
</template>

<script setup lang="ts" name="ChatAppearance">
import { useChatStore } from "@/stores/modules/useChatStore";

const chatStore = useChatStore();
</script>

<style scoped lang="scss"></style>
