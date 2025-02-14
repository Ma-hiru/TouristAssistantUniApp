<template>
  <view class="w-full">
    <button @tap="generateCard">生成卡片</button>
    <canvas
      class="m-auto"
      canvas-id="myCanvas"
      :style="{
        width: displayWidth + 'px',
        height: displayHeight + 'px',
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
    };
  },
  props: {
    width: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    generateCard() {
      this.createCanvas();
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
    async createCanvas() {
      if (!shareStore.coverSrc[0]) {
        uni.showToast({
          title: "请先上传封面",
          icon: "none",
        });
        return;
      }
      const ctx = uni.createCanvasContext("myCanvas", this);
      this.scaleRatio = this.width / this.displayWidth;
      this.displayWidth = this.displayWidth * this.scaleRatio;
      this.displayHeight = this.displayHeight * this.scaleRatio;
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
      const widthRatio = this.displayWidth / imgWidth;
      const heightRatio = this.displayHeight / imgHeight;
      const scale = Math.max(widthRatio, heightRatio);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const offsetX = (this.displayWidth - drawWidth) / 2;
      const offsetY = (this.displayHeight - drawHeight) / 2;
      ctx.drawImage(
        shareStore.coverSrc[0],
        0,
        0,
        drawWidth,
        drawHeight,
        offsetX,
        offsetY
      );
      ctx.setGlobalAlpha(0.75);
      ctx.drawImage(
        "/static/img.png",
        0,
        0,
        this.displayWidth,
        this.displayHeight
      );
      ctx.setGlobalAlpha(1);
      ctx.scale(this.scaleRatio);
      ctx.draw();
    },
  },
  expose: ["generateCard"],
};
</script>
<style></style>
