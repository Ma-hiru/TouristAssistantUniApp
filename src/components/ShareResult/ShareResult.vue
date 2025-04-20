<template>
  <view class="overflow-hidden flex justify-center items-center h-full w-full">
    <view v-show="isLoading" class="inline-block">
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
    <view style="position: fixed; top: 999999px; overflow: hidden">
      <canvas
        canvas-id="drawTemp"
        :style="{
          width: drawWidth + 'px',
          height: drawHeight + 'px',
        }"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { useCheckStore } from "@/stores";
import { GetTime } from "@/utils";
import { defineComponent } from "vue";

const checkStore = useCheckStore();
export default defineComponent({
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
    async generateCard(path) {
      this.isLoading = true;
      await this.createCanvas(path, false, "myCanvas");
      this.isLoading = false;
      this.createCanvas(path, true, "drawTemp").then(() =>
        uni.canvasToTempFilePath(
          {
            canvasId: "drawTemp",
            success: (res) => {
              this.generateImg = res.tempFilePath;
              checkStore.history.push({
                path: this.generateImg,
                time: GetTime(),
              });
            },
          },
          this
        )
      );
    },
    async createCanvas(path, isDraw, canvasId) {
      const ctx = uni.createCanvasContext(canvasId, this);
      if (!isDraw) {
        this.scaleRatio = this.width / this.displayWidth;
        this.displayWidth = this.displayWidth * this.scaleRatio;
        this.displayHeight = this.displayHeight * this.scaleRatio;
      }
      const { width: imgWidth, height: imgHeight } = await this.loadImageInfo(
        checkStore.coverSrc[0]
      );
      let widthRatio;
      let heightRatio;
      let scale;
      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;
      if (!isDraw) {
        widthRatio = this.displayWidth / imgWidth;
        heightRatio = this.displayHeight / imgHeight;
        scale = Math.max(widthRatio, heightRatio);
        drawWidth = imgWidth * scale;
        drawHeight = imgHeight * scale;
        offsetX = (this.displayWidth - drawWidth) / 2;
        offsetY = (this.displayHeight - drawHeight) / 2;
      } else {
        widthRatio = this.drawWidth / imgWidth;
        heightRatio = this.drawHeight / imgHeight;
        scale = Math.max(widthRatio, heightRatio);
        drawWidth = imgWidth * scale;
        drawHeight = imgHeight * scale;
        offsetX = (this.drawWidth - drawWidth) / 2;
        offsetY = (this.drawHeight - drawHeight) / 2;
      }
      ctx.drawImage(
        checkStore.coverSrc[0],
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
      ctx.setGlobalAlpha(0.75);
      if (!isDraw)
        ctx.drawImage(path, 0, 0, this.displayWidth, this.displayHeight);
      else ctx.drawImage(path, 0, 0, this.drawWidth, this.drawHeight);
      ctx.setGlobalAlpha(0.75);
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
    setDisplaySize(displayWidth, displayHeight) {
      this.displayHeight = displayHeight;
      this.displayWidth = displayWidth;
      this.drawHeight = displayHeight;
      this.drawWidth = displayWidth;
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
                checkStore.history.push({
                  path: this.generateImg,
                  time: GetTime(),
                });
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
              checkStore.history.push({
                path: this.generateImg,
                time: GetTime(),
              });
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
});
</script>
<style></style>
