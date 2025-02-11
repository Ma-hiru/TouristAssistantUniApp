<template>
  <view
    class="w-full h-full grid grid-cols-2 grid-rows-3 items-center justify-items-center"
  >
    <view
      v-for="(src, index) in shareStore.coverSrc"
      class="relative bg-gray-100 flex justify-center items-center overflow-visible rounded-lg"
      :key="index"
    >
      <image
        :src="src"
        :style="{ width: '35vw', height: '18vh' }"
        mode="aspectFill"
      >
        <view
          @tap.stop="cancelUploadImage(index)"
          class="absolute -top-1 -right-1 w-6 h-6 bg-[#999999] flex justify-center items-center rounded-full z-50"
        >
          <uni-icons type="closeempty" color="#ffffff" />
        </view>
      </image>
    </view>
    <button
      v-show="shareStore.coverSrc.length <= 5"
      @tap="uploadImg"
      :style="{ width: '35vw', height: '18vh' }"
      class="clear-btn bg-gray-100 flex justify-center items-center relative overflow-visible rounded-lg"
    >
      <uni-icons type="plusempty" size="24" />
    </button>
  </view>
</template>

<script setup lang="ts" name="uploadImg">
import { useShareStore } from "@/stores";

const shareStore = useShareStore();
const uploadImg = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["album", "camera"],
    success: (res) => {
      console.log(res.tempFilePaths[0]);
      shareStore.coverSrc.push(res.tempFilePaths[0]);
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
const cancelUploadImage = (index: number) => {
  shareStore.coverSrc.splice(index, 1);
};
</script>

<style scoped lang="scss"></style>
