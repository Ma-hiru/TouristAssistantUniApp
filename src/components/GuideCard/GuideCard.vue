<template>
  <view
    class="m-1 flex rounded-lg bg-white flex-col justify-center items-center p-1"
    :style="{
      marginLeft: `${props.noLeftMargin ? 0 : 0.25}rem`,
    }"
  >
    <view class="w-full">
      <image
        :src="props.cover"
        mode="widthFix"
        class="rounded-lg"
        :style="{ width: 'calc(100%)' }"
      />
    </view>
    <view class="pt-2 pb-2 text-left w-full">
      {{ props.content }}
    </view>
    <view
      class="grid grid-rows-1 grid-cols-[minmax(0,1fr)_auto] max:w-full w-full"
    >
      <view
        class="flex justify-start items-center text-ellipsis whitespace-nowrap overflow-hidden"
      >
        <ant-avatar :src="props.avatar" size="x-small" />
        <text class="ml-1 text-[#666] text-ellipsis whitespace-nowrap text-sm">
          {{ props.username }}
        </text>
      </view>
      <view class="flex justify-center items-center w-10">
        <ant-icon type="HeartOutline" />
        <text>{{ props.like }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="GuideCard">
const props = defineProps<{
  noLeftMargin: boolean;
  like: string;
  username: string;
  avatar: string;
  content: string;
  cover: string;
}>();
</script>

<style scoped lang="scss"></style>
