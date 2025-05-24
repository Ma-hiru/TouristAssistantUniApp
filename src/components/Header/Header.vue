<template>
  <view class="bg-white w-screen top-0 left-0 z-[60] fixed">
    <view
      class="text-center text-base font-bold flex justify-center items-center"
      :style="{
        height: $slots.default ? `100rpx` : `120rpx`,
        marginTop: `${top}rpx`,
        paddingTop: `25rpx`,
      }"
    >
      <text>{{ title }}</text>
    </view>
    <view class="w-screen relative">
      <slot name="default" />
    </view>
  </view>
  <view
    v-if="fill"
    :style="{
      height: `${top + 120 + slotHeight}rpx`,
    }"
  />
</template>

<script setup lang="ts" name="Header">
const { top } = uni.getMenuButtonBoundingClientRect();
const { title, slotHeight, fill } = withDefaults(
  defineProps<{
    title: string;
    slotHeight?: number;
    fill?: boolean;
  }>(),
  {
    slotHeight: 0,
    fill: false,
  }
);
</script>

<style scoped lang="scss"></style>
