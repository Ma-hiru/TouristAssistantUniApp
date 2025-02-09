<template>
  <view class="w-full p-2 mt-2 flex flex-col bg-white rounded-lg">
    <view class="flex justify-start items-center pb-2">
      <ant-avatar :src="props.detail.avatar" size="small" />
      <view class="flex flex-col ml-[10rpx]">
        <text>{{ props.detail.nickname }}</text>
        <text class="text-[#999999]">
          {{
            props.detail.time.split("-")[1] +
            "-" +
            props.detail.time.split("-")[2]
          }}
        </text>
      </view>
    </view>
    <view class="pl-[70rpx]">
      <text>{{ props.detail.content }}</text>
    </view>
  </view>
</template>

<script setup lang="ts" name="Comment">
import { CommentDetail } from "@/types/guide";

const props = defineProps<{
  detail: CommentDetail;
}>();
</script>

<style scoped lang="scss"></style>
