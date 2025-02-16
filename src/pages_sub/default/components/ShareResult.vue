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
      }"
    />
  </view>
  <view style="position: fixed; top: 999999px; overflow: hidden">
    <canvas
      canvas-id="drawTemp"
      :style="{
        width: drawWidth + 'px',
        height: drawHeight + 'px',
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
      displayWidth: 0,
      displayHeight: 0,
      drawWidth: 0,
      drawHeight: 0,
      scaleRatio: 1,
      generateImg: "",
      isLoading: true,
      isSmall: true,
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
      if (!shareStore.coverSrc[0]) {
        await uni.showToast({
          title: "请先上传封面",
          icon: "none",
        });
        return;
      }
      this.isLoading = true;
      await this.createCanvas(path, isSmall);
      this.isLoading = false;
      await this.drawCanvas(path);
    },
    async createCanvas(path) {
      const ctx = uni.createCanvasContext("myCanvas", this);
      this.scaleRatio = this.width / this.displayWidth;
      this.displayWidth = this.displayWidth * this.scaleRatio;
      this.displayHeight = this.displayHeight * this.scaleRatio;
      const { width: imgWidth, height: imgHeight } = await this.loadImageInfo(
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
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
      ctx.setGlobalAlpha(0.75);
      ctx.drawImage(path, 0, 0, this.displayWidth, this.displayHeight);
      ctx.setGlobalAlpha(1);
      ctx.draw();
    },
    async loadImageInfo(src) {
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src,
          success: resolve,
          fail: reject,
        });
      });
    },
    async drawCanvas(path) {
      const ctx = uni.createCanvasContext("drawTemp", this);
      const { width: imgWidth, height: imgHeight } = await this.loadImageInfo(
        shareStore.coverSrc[0]
      );
      const widthRatio = this.drawWidth / imgWidth;
      const heightRatio = this.drawHeight / imgHeight;
      const scale = Math.max(widthRatio, heightRatio);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const offsetX = (this.drawWidth - drawWidth) / 2;
      const offsetY = (this.displayHeight - drawHeight) / 2;
      ctx.drawImage(
        shareStore.coverSrc[0],
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
      ctx.setGlobalAlpha(0.75);
      ctx.drawImage(path, 0, 0, this.drawWidth, this.drawHeight);
      ctx.setGlobalAlpha(1);
      ctx.draw();
    },
    checkImg() {
      if (this.generateImg)
        uni.previewImage({
          urls: [this.generateImg],
          current: 0,
        });
      else {
        uni.showToast({
          title: "加载中",
          icon: "none",
          duration: 2000,
        });
        uni.canvasToTempFilePath(
          {
            canvasId: "drawTemp",
            success: (res) => {
              if (!this.isLoading) {
                this.generateImg = res.tempFilePath;
                uni.previewImage({
                  urls: [res.tempFilePath],
                  current: 0,
                });
              }
            },
          },
          this
        );
      }
    },
    setDisplaySize(displayWidth, displayHeight) {
      this.displayHeight = displayHeight;
      this.displayWidth = displayWidth;
      this.drawHeight = displayHeight;
      this.drawWidth = displayWidth;
    },
    saveImg() {
      if (this.generateImg)
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
      else {
        uni.showToast({
          title: "保存中",
          icon: "loading",
          duration: 2000,
        });
        uni.canvasToTempFilePath(
          {
            canvasId: "drawTemp",
            success: (res) => {
              this.generateImg = res.tempFilePath;
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
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
          this
        );
      }
    },
  },
  expose: ["generateCard", "setDisplaySize", "saveImg"],
};
</script>
<style></style>
