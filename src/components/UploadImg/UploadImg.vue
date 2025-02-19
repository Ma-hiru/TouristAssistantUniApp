<template>
  <view class="w-full h-full flex justify-center items-center relative">
    <view
      v-for="(src, index) in checkStore.coverSrc"
      class="relative flex justify-center items-center overflow-visible rounded-lg h-full"
      :key="index"
    >
      <image :src="src" :style="{ height: '80%' }" mode="heightFix">
        <view
          @tap.stop="cancelUploadImage(index)"
          class="absolute top-5 -right-3 w-6 h-6 bg-[#999999] flex justify-center items-center rounded-full z-50"
        >
          <uni-icons type="closeempty" color="#ffffff" />
        </view>
      </image>
    </view>
    <button
      v-show="checkStore.coverSrc.length < 1"
      @tap="uploadImg"
      :style="{ width: '35vw', height: '18vh' }"
      class="clear-btn bg-gray-100 flex justify-center items-center relative overflow-visible rounded-lg"
    >
      <uni-icons type="plusempty" size="24" />
    </button>
    <view class="absolute bottom-4 w-full flex justify-center">
      <button
        class="clear-btn p-2 flex justify-center items-center"
        @tap="gotoHistory"
        v-show="checkStore.coverSrc.length < 1"
      >
        <image
          src="/static/check/history.svg"
          style="height: 1rem; width: 1rem"
        />
        <text class="text-sm ml-1 text-[#999]">历史记录</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts" name="uploadImg">
import { useCheckStore } from "@/stores";

const checkStore = useCheckStore();
const uploadImg = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["album", "camera"],
    success: (res) => {
      console.log(res.tempFilePaths[0]);
      checkStore.coverSrc.push(res.tempFilePaths[0]);
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
const cancelUploadImage = (index: number) => {
  checkStore.coverSrc.splice(index, 1);
};
const gotoHistory = () => {
  uni.navigateTo({
    url: "/pages_sub/default/pages/checkHistory/checkHistory",
  });
};
</script>

<style scoped lang="scss"></style>
