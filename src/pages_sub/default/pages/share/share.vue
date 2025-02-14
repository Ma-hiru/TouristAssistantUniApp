<template>
  <view
    class="w-screen h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1"
    :style="{ paddingBottom: `${safeAreaInsets.bottom}px` }"
  >
    <ant-steps :items="items" :current="currentSteps" />
    <view class="w-full pl-8 pr-8 overflow-hidden">
      <view class="w-full" id="containerRef">
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
          />
        </view>
        <share-result
          v-show="currentSteps === 2"
          :width="containerRefWidth"
          ref="resultRef"
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
          {{ currentSteps === items.length - 1 ? "生成" : "下一步" }}
        </text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import UploadImg from "@/pages_sub/default/components/UploadImg.vue";
import ShareResult from "@/pages_sub/default/components/ShareResult.vue";
import { useShareStore } from "@/stores";
import NodeInfo = UniNamespace.NodeInfo;
import { onReady } from "@dcloudio/uni-app";

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
        if ((rect as NodeInfo).width) {
          console.log("获取到容器宽度:", (rect as NodeInfo).width);
          containerRefWidth.value = (rect as NodeInfo).width!;
        } else {
          handleManualCalculation();
        }
      })
      .exec();
  }, 1500);
  const handleManualCalculation = () => {
    console.log("手动计算宽度前:", containerRefWidth.value);
    const margin = 32 * 2;
    containerRefWidth.value = screenWidth - margin;
    console.log("手动计算宽度后:", containerRefWidth.value);
  };
});
const shareStore = useShareStore();
const currentSteps = ref(0);
const items = ref([
  {
    title: "步骤一",
    description: "上传图片",
  },
  {
    title: "步骤二",
    description: "写下感受",
  },
  {
    title: "步骤三",
    description: "生成游记",
  },
]);
const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const nextStep = () => {
  if (currentSteps.value === items.value.length - 1) {
    console.log("生成游记");
    resultRef.value!.generateCard();
  }
  if (items.value.length - 1 !== currentSteps.value) currentSteps.value++;
};
const lastStep = () => {
  currentSteps.value--;
};
</script>

<style scoped lang="scss"></style>
