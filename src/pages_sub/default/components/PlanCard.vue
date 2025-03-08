<template>
  <view class="card-container">
    <view class="flex justify-start items-center">
      <text class="text-dot" />
      <text class="text-content">
        {{ props.subTitle }}
        <text class="font-bold">{{ props.title }}</text>
      </text>
    </view>
    <view class="card shadow-lg">
      <slot name="default" />
    </view>
  </view>
</template>

<script setup lang="ts" name="PlanCard">
const props = defineProps<{
  subTitle: string;
  title: string;
}>();
</script>

<style scoped lang="scss">
.card-container {
  margin-top: 1.5rem;
  .text-dot {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    background: yellow;
  }

  .text-content {
    color: #333333;
  }

  .card {
    width: 100%;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
  }
}
</style>
