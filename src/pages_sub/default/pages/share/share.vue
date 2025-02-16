<template>
  <view
    class="w-screen h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1"
    :style="{ paddingBottom: `${safeAreaInsets.bottom}px` }"
  >
    <ant-steps :items="shareStore.items" :current="currentSteps" />
    <view class="w-full pl-8 pr-8 overflow-hidden">
      <upload-img
        v-show="currentSteps === 0"
        :style="{ transition: 'all 0.3s' }"
      />
      <view class="pt-4" v-show="currentSteps === 1">
        <textarea
          placeholder="写下你的感受吧！"
          v-model="shareStore.feelingText"
          class="bg-gray-100 w-full shadow-sm p-4"
          maxlength="500"
          :show-confirm-bar="false"
          confirm-type="done"
          :auto-height="true"
        />
      </view>
      <view class="w-full" id="containerRef">
        <share-result
          :width="containerRefWidth"
          ref="resultRef"
          v-if="currentSteps === 2"
        />
      </view>
    </view>
    <view class="pb-8 p-12 w-screen">
      <button
        @tap="lastStep"
        v-show="currentSteps > 0"
        class="w-full h-12 leading-4 bg-[var(--diy-color-primary)] flex justify-center items-center rounded-lg text-white mb-4"
        hover-class="btn-hover"
      >
        <text class="font-medium text-base">上一步</text>
      </button>
      <button
        class="w-full h-12 leading-4 bg-[var(--diy-color-primary)] flex justify-center items-center rounded-lg text-white"
        hover-class="btn-hover"
        @tap="nextStep"
      >
        <text class="font-medium text-base">
          {{ btnTitle }}
        </text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed } from "vue";
import UploadImg from "@/pages_sub/default/components/UploadImg.vue";
import ShareResult from "@/pages_sub/default/components/ShareResult.vue";
import { useShareStore, useUserStore } from "@/stores";
import NodeInfo = UniNamespace.NodeInfo;
import { onReady } from "@dcloudio/uni-app";
import { reqGetCard } from "@/api/modules/cardAPI";
import {
  convertBufferResultToArrayBuffer,
  GetTime,
  saveTempImage,
} from "@/utils";

const btnTitle = computed(() => {
  if (currentSteps.value === shareStore.items.length - 1) return "保存大图";
  else if (currentSteps.value === shareStore.items.length - 2) return "生成";
  else return "下一步";
});
const userStore = useUserStore();
const containerRefWidth = ref(0);
const instance = getCurrentInstance();
const resultRef = ref<InstanceType<typeof ShareResult>>();
onReady(() => {
  const systemInfo = uni.getWindowInfo();
  const screenWidth = systemInfo.screenWidth;
  setTimeout(() => {
    const query = uni.createSelectorQuery().in(instance!.proxy);
    query
      .select("#containerRef")
      .boundingClientRect((rect) => {
        if ((rect as NodeInfo).width)
          containerRefWidth.value = (rect as NodeInfo).width!;
        else handleManualCalculation();
      })
      .exec();
  }, 500);
  const handleManualCalculation = () => {
    const margin = 32 * 2;
    containerRefWidth.value = screenWidth - margin;
  };
});
const shareStore = useShareStore();
const currentSteps = ref(0);
const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const nextStep = async () => {
  if (currentSteps.value === shareStore.items.length - 1) {
    resultRef.value!.saveImg();
  } else if (currentSteps.value === shareStore.items.length - 2) {
    if (shareStore.feelingText === "") {
      await uni.showToast({
        title: "请输入文字！",
        icon: "none",
      });
      return;
    }
    currentSteps.value++;
    const res = await reqGetCard({
      temp: "tempB",
      color: "dark-color-2",
      title: "你好",
      date: GetTime(),
      content: shareStore.feelingText,
      author: "@八奈见杏菜",
      qrcodetitle: "随身小D",
      qrcodetext: "扫描二维码",
      qrcode: "https://shiina-mahiru.cn/",
      watermark: "随身小D",
      switchConfig: {
        showIcon: "false",
        showForeword: "false",
      },
    });
    const filePath = await saveTempImage(
      convertBufferResultToArrayBuffer(res.result)
    );
    const { width, height } = await uni.getImageInfo({
      src: filePath,
    });
    resultRef.value!.setDisplaySize(width, height);
    await resultRef.value!.generateCard(filePath);
  }
  if (shareStore.items.length - 1 !== currentSteps.value) currentSteps.value++;
};
const lastStep = () => {
  currentSteps.value--;
};
</script>

<style scoped lang="scss"></style>
