<template>
  <view class="w-screen h-screen overflow-x-scroll p-2 bg-gray-200">
    <view
      class="w-full h-full flex justify-center items-center"
      v-if="checkStore.history.length === 0"
    >
      <view class="flex justify-center items-center">
        <image src="/static/check/null.svg" style="height: 1rem; width: 1rem" />
        <text class="ml-2">暂无数据，快去打卡吧！</text>
      </view>
    </view>
    <view class="w-screen text-center text-[#999] text-sm" v-else>
      Tips:长按保存图片
    </view>
    <view
      class="p-2 bg-white mt-2"
      v-for="(card, index) in checkStore.history"
      :key="card.time"
    >
      <view class="mb-2 font-bold text-sm">{{ card.time }}</view>
      <image
        style="width: 100%"
        mode="widthFix"
        :src="card.path"
        @tap="previewImage(index)"
        @longpress="save(index)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useCheckStore } from "@/stores";

const checkStore = useCheckStore();
const previewImage = (index: number) => {
  uni.previewImage({
    urls: checkStore.history.map((item) => item.path),
    current: index,
  });
};
const save = (index: number) => {
  console.log(index);
  uni.saveImageToPhotosAlbum({
    filePath: checkStore.history[index].path,
    success: () => {
      uni.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2000,
      });
    },
    fail: () => {
      uni.showToast({
        title: "保存失败",
        icon: "none",
        duration: 2000,
      });
    },
  });
};
</script>

<style scoped lang="scss"></style>
