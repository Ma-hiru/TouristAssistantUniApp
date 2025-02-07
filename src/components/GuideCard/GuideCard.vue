<template>
  <view
    class="m-1 flex rounded-lg bg-white flex-col justify-center items-center p-1"
    :style="{
      marginLeft: `${props.noLeftMargin ? 0 : 0.25}rem`,
    }"
  >
    <view class="w-full">
      <image
        src="https://shiina-mahiru.cn/download/user_bg.png"
        mode="widthFix"
        class="rounded-lg"
        :style="{ width: 'calc(100%)' }"
      />
    </view>
    <view class="pt-2 pb-2"> paddingLeft: `${i % 2 === 0 ? 0 : 0.25}rem` </view>
    <view
      class="grid grid-rows-1 grid-cols-[minmax(0,1fr)_auto] max:w-full w-full"
    >
      <view
        class="flex justify-start items-center text-ellipsis whitespace-nowrap overflow-hidden"
      >
        <ant-avatar
          :src="'https://i1.hdslb.com/bfs/face/3a59c98c91d0e14d0a965e45577e6f5f7e73c6ce.jpg@96w_96h_1c_1s.avif'"
          size="x-small"
        />
        <text class="ml-1 text-[#666] text-ellipsis whitespace-nowrap text-sm">
          {{ "八奈见杏菜" }}
        </text>
      </view>
      <view class="flex justify-center items-center w-10">
        <ant-icon type="HeartOutline" />
        <text>1k</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="GuideCard">
const props = defineProps<{
  noLeftMargin: boolean;
}>();
</script>

<style scoped lang="scss"></style>
