<template>
  <view>
    <view
      class="w-screen flex justify-center items-center"
      :style="{ height: height + 'rpx' }"
    >
      <text v-show="!loading" class="tips">{{ tips }}</text>
      <uni-icons v-show="loading" type="spinner-cycle" size="30" />
    </view>
  </view>
</template>

<script setup lang="ts" name="BottomTips">
const { tips, height, loading } = withDefaults(
  defineProps<{
    tips: string;
    height?: number;
    loading?: boolean;
  }>(),
  {
    height: 160,
    loading: false,
  }
);
</script>

<style scoped lang="scss">
.tips {
  color: #a5a5a5;
}
</style>
