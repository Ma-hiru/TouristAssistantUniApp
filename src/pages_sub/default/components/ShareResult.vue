<template>
  <view class="w-full overflow-hidden">
    <view class="flex justify-center w-full" v-show="isLoading">
      <ant-loading type="mini" />
    </view>
    <canvas
      @tap="checkImg"
      canvas-id="myCanvas"
      :style="{
        width: displayWidth + 'px',
        height: displayHeight + 'px',
        transform: 'scale(' + canvasSize + ')',
        transformOrigin: 'left top',
      }"
    />
  </view>
</template>

<script>
import { useShareStore } from "@/stores";

const shareStore = useShareStore();
export default {
  data() {
    return {
      displayWidth: 880,
      displayHeight: 966,
      scaleRatio: 1,
      generateImg: "",
      isLoading: true,
      isSmall: true,
      canvasSize: 1,
    };
  },
  props: {
    width: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    async generateCard(path, isSmall) {
      this.isLoading = true;
      await this.createCanvas(path, isSmall);
      this.isLoading = false;
      uni.canvasToTempFilePath(
        {
          canvasId: "myCanvas",
          success: (res) => {
            this.generateImg = res.tempFilePath;
          },
        },
        this
      );
    },
    async createCanvas(path, isSmall) {
      if (!shareStore.coverSrc[0]) {
        await uni.showToast({
          title: "请先上传封面",
          icon: "none",
        });
        return;
      }
      const ctx = uni.createCanvasContext("myCanvas", this);
      if (isSmall) {
        this.scaleRatio = this.width / this.displayWidth;
        this.canvasSize = 1;
      } else {
        this.scaleRatio = this.width / this.displayWidth;
        this.canvasSize = this.scaleRatio;
      }

      const loadImageInfo = (src) => {
        return new Promise((resolve, reject) => {
          uni.getImageInfo({
            src,
            success: resolve,
            fail: reject,
          });
        });
      };
      const { width: imgWidth, height: imgHeight } = await loadImageInfo(
        shareStore.coverSrc[0]
      );
      if (isSmall) {
        this.displayWidth = this.displayWidth * this.scaleRatio;
        this.displayHeight = this.displayHeight * this.scaleRatio;
      }
      const widthRatio = this.displayWidth / imgWidth;
      const heightRatio = this.displayHeight / imgHeight;
      const scale = Math.max(widthRatio, heightRatio);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const offsetX = (this.displayWidth - drawWidth) / 2;
      const offsetY = (this.displayHeight - drawHeight) / 2;
      ctx.drawImage(
        shareStore.coverSrc[0],
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
      ctx.setGlobalAlpha(0.75);
      ctx.drawImage(path, 0, 0, this.displayWidth, this.displayHeight);
      ctx.setGlobalAlpha(1);
      if (isSmall) ctx.scale(this.scaleRatio);
      ctx.draw();
    },
    checkImg() {
      if (!this.isLoading) {
        uni.previewImage({
          urls: [this.generateImg],
          current: 0,
        });
      }
    },
    setDisplaySize(displayWidth, displayHeight) {
      this.displayHeight = displayHeight;
      this.displayWidth = displayWidth;
    },
    saveImg() {
      if (!this.generateImg) {
        uni.showToast({
          title: "加载中",
          icon: "none",
        });
        return;
      }
      uni.saveImageToPhotosAlbum({
        filePath: this.generateImg,
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
    },
  },
  expose: ["generateCard", "setDisplaySize", "saveImg"],
};
</script>
<style></style>
