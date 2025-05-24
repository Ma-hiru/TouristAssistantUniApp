<template>
  <view @tap="selectPost" style="padding: 0 10rpx 15rpx">
    <view
      class="flex bg-white flex-col justify-end items-center"
      style="border-radius: 20rpx; padding: 10rpx 10rpx"
    >
      <view
        :style="{
          width: `100%`,
          background: `url(${props.cover}) no-repeat center center`,
          height: `400rpx`,
          backgroundSize: `cover`,
          borderRadius: `20rpx`,
        }"
      />
      <view class="pt-2 pb-2 text-left w-full">
        {{ props.content }}
      </view>
      <view
        class="grid grid-rows-1 grid-cols-[minmax(0,1fr)_auto] max:w-full w-full"
        style="height: 50rpx"
      >
        <view
          class="flex justify-start items-center text-ellipsis whitespace-nowrap overflow-hidden"
        >
          <ant-avatar :src="props.avatar" size="x-small" />
          <text
            class="ml-1 text-[#666] text-ellipsis whitespace-nowrap text-sm"
          >
            {{ props.username }}
          </text>
        </view>
        <view class="flex justify-center items-center h-full">
          <ant-icon type="HeartOutline" />
          <text class="text-sm ml-1">
            {{
              props.like > 1000
                ? `${(props.like / 1000).toFixed(1)}k`
                : props.like
            }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="GuideCard">
const props = defineProps<{
  noLeftMargin: boolean;
  like: number;
  username: string;
  avatar: string;
  content: string;
  cover: string;
  id: number;
}>();
const selectPost = () => {
  uni.navigateTo({ url: `/pages_sub/default/pages/post/post?id=${props.id}` });
};
</script>

<style scoped lang="scss"></style>
