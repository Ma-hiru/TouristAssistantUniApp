<template>
  <view
    class="bg-white grid grid-cols-1 grid-rows-[minmax(0,1fr)_auto] w-screen h-full"
  >
    <view class="w-screen grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
      <view>
        <ant-steps :items="checkStore.items" :current="currentSteps" />
      </view>
      <view v-show="currentSteps === 0">
        <view
          class="bg-white grid grid-cols-3 justify-items-center items-center rounded-b-lg"
        >
          <view
            class="m-2"
            v-for="(tag, index) in checkStore.tags"
            :key="tag.id"
            @tap="selectTags(index)"
          >
            <uni-tag :inverted="true" :text="tag.title" :type="tag.type" />
          </view>
        </view>
        <view class="m-8 mt-4 flex flex-col items-center">
          <textarea
            placeholder="写下你的感受吧！"
            v-model="checkStore.feelingText"
            class="bg-gray-100 w-full shadow-sm p-4"
            maxlength="100"
            :show-confirm-bar="false"
            confirm-type="done"
          />
          <button
            class="p-1 m-auto mt-2 clear-btn flex justify-center items-center"
            @tap="insertYIYAN"
          >
            <image
              src="/static/check/yiyan.svg"
              class="mr-1"
              style="height: 1.3rem; width: 1.3rem"
            />
            插入一言
          </button>
        </view>
      </view>
      <view
        v-show="currentSteps === 1"
        class="w-full overflow-hidden grid grid-rows-[auto_minmax(0,1fr)]"
      >
        <view class="pl-2 pr-2 flex">
          <uni-easyinput
            v-model="searchText"
            confirm-type="search"
            placeholder="搜索地点"
            :adjust-position="false"
          />
          <button
            class="h-full rounded-lg pl-1 pr-1 ml-1 flex justify-center items-center bg-white shadow-sm"
            @tap="findPoint"
          >
            <image
              src="/static/check/find.svg"
              style="height: 1rem; width: 1rem"
            />
            <text class="text-sm ml-1"> 识别</text>
          </button>
        </view>
        <view class="overflow-y-scroll w-full">
          <uni-list :border="false">
            <uni-list-chat
              v-for="(point, index) in pointList"
              :key="point.id"
              :clickable="true"
              :title="point.title"
              link
              @click="handleTapList(point.id, index)"
              :avatar="point.detail.cover"
              :note="point.detail.content"
              badge-positon="left"
            >
              <view class="chat-custom-right">
                <uni-icons
                  type="checkmarkempty"
                  color="#999"
                  size="18"
                  v-show="checkPoint?.id === point.id"
                />
              </view>
            </uni-list-chat>
          </uni-list>
        </view>
      </view>
      <view v-show="currentSteps === 2" class="overflow-hidden">
        <UploadImg v-if="!isLastStep" />
        <view id="containerRef" class="ml-16 mr-16 w-[calc(100%-8rem)] h-full">
          <ShareResult
            ref="resultRef"
            v-if="isLastStep"
            :width="containerRefWidth"
          />
        </view>
      </view>
    </view>
    <view class="pl-8 pr-8 pb-6">
      <button
        v-show="currentSteps > 0"
        class="p-2 rounded-lg bg-[#FFCA22] clear-btn mb-2"
        @tap="lastStep"
      >
        {{ isLastStep ? "取消" : "上一步" }}
      </button>
      <button class="p-2 rounded-lg bg-[#FFCA22] clear-btn" @tap="nextStep">
        {{ btnText }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts" name="CheckShare">
import { computed, getCurrentInstance, ref } from "vue";
import UploadImg from "@/components/UploadImg/UploadImg.vue";
import ShareResult from "@/components/ShareResult/ShareResult.vue";
import { useCheckStore } from "@/stores/modules/useCheckStore";
import { reqGetCard } from "@/api/modules/cardAPI";
import NodeInfo = UniNamespace.NodeInfo;
import {
  convertBufferResultToArrayBuffer,
  GetTime,
  saveTempImage,
} from "@/utils";
import { watch } from "vue";
import { useMapStore } from "@/stores";
import { Point } from "@/types/map";
import { ModelCard, ScenicName } from "@/settings";
import { CardParams } from "@/types/card";

const props = defineProps<{
  yiyan: string;
}>();
const insertYIYAN = () => {
  checkStore.feelingText += props.yiyan;
};
const pointList = computed(() =>
  mapStore.pointList.filter((item) => {
    return item.title.includes(searchText.value);
  })
);
const findPoint = () => {
  uni.showToast({
    title: "识别地点中...",
    icon: "loading",
    duration: 2000,
  });
  setTimeout(() => {
    searchText.value = "武当山2";
  }, 2000);
};
const mapStore = useMapStore();
const checkPoint = ref<Point>();
const searchText = ref("");
const handleTapList = (id: number, index: number) => {
  if (checkPoint.value && checkPoint.value.id === id)
    checkPoint.value = undefined;
  else {
    if (mapStore.pointList[index].id === id)
      checkPoint.value = mapStore.pointList[index];
    else checkPoint.value = mapStore.pointList.find((item) => item.id === id);
  }
};
const checkStore = useCheckStore();
const selectTags = (index: number) => {
  checkStore.tags = checkStore.tags.map((tag) => ({
    ...tag,
    type: "default",
  }));
  checkStore.tags[index].type = "primary";
};
const currentSteps = ref(0);
const resultRef = ref<InstanceType<typeof ShareResult>>();
const isLastStep = ref(false);
const btnText = computed(() => {
  if (isLastStep.value) return "保存大图";
  else if (currentSteps.value === checkStore.items.length - 1) return "生成";
  else return "下一步";
});
const nextStep = async () => {
  if (isLastStep.value) {
    resultRef.value!.saveImg();
  } else if (currentSteps.value === checkStore.items.length - 1) {
    const tag = checkStore.tags.find((tag) => tag.type === "primary");
    if (!tag)
      return await uni.showToast({
        title: "请选择心情标签",
        icon: "none",
      });
    const tagText = tag.title;
    if (!checkPoint.value) {
      return await uni.showToast({
        title: "请选择地点",
        icon: "none",
      });
    }
    if (checkStore.feelingText === "")
      return await uni.showToast({
        title: "请输入文字！",
        icon: "none",
      });
    if (!checkStore.coverSrc[0])
      return await uni.showToast({
        title: "请先上传封面",
        icon: "none",
      });
    isLastStep.value = true;
    const res = await reqGetCard({
      title: ScenicName + "·" + checkPoint.value.title,
      date: GetTime(),
      content: checkStore.feelingText,
      author: "@八奈见杏菜",
      qrcodetitle: "随身小D · " + tagText + "卡片",
      ...(ModelCard as CardParams),
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
  if (checkStore.items.length - 1 !== currentSteps.value) currentSteps.value++;
};
const lastStep = () => {
  if (currentSteps.value === checkStore.items.length - 1 && isLastStep.value) {
    isLastStep.value = false;
  } else currentSteps.value--;
};
const instance = getCurrentInstance();
const containerRefWidth = ref(0);
watch(isLastStep, () => {
  const systemInfo = uni.getWindowInfo();
  const screenWidth = systemInfo.screenWidth;
  const query = uni.createSelectorQuery().in(instance!.proxy);
  query
    .select("#containerRef")
    .boundingClientRect((rect) => {
      if ((rect as NodeInfo).width)
        containerRefWidth.value = (rect as NodeInfo).width!;
      else handleManualCalculation();
      console.log(containerRefWidth.value);
    })
    .exec();
  const handleManualCalculation = () => {
    const margin = 64 * 2;
    containerRefWidth.value = screenWidth - margin;
  };
});
</script>

<style scoped lang="scss"></style>
