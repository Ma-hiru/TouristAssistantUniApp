<template>
  <view class="bg-white w-screen top-0 left-0 z-[60] fixed">
    <view
      class="text-center text-base font-bold flex justify-center items-center relative"
      :style="{
        height: $slots.default ? `100rpx` : `120rpx`,
        marginTop: `${top}rpx`,
        paddingTop: `25rpx`,
      }"
    >
      <view
        @tap="goBack"
        class="back"
        :style="{
          height: $slots.default ? `100rpx` : `120rpx`,
          paddingTop: `25rpx`,
          paddingLeft: `25rpx`,
        }"
      >
        <button v-show="back" class="clear-btn">
          <uni-icons type="arrow-left" size="25" />
        </button>
      </view>
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
const { title, slotHeight, fill, back } = withDefaults(
  defineProps<{
    title: string;
    slotHeight?: number;
    fill?: boolean;
    back?: boolean;
  }>(),
  {
    slotHeight: 0,
    fill: false,
    back: false,
  }
);

const goBack = () => {
  uni.navigateBack();
};
</script>

<style scoped lang="scss">
.back {
  position: absolute;
  display: flex;
  justify-content: start;
  align-items: center;
  left: 0;
  top: 0;
}
</style>
