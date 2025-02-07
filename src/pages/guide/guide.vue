<template>
  <view class="w-screen h-screen relative bg-gray-200">
    <view class="bg-white w-screen top-0 left-0 z-[60] fixed">
      <view :style="{ height: `${menuButtonTop}px`, marginBottom: '2.5rem' }" />
    </view>
    <view
      class="fixed w-screen top-0 left-0 z-[70]"
      :style="{ paddingTop: `${menuButtonTop}px` }"
    >
      <view
        class="text-center relative text-base font-bold flex justify-center items-center"
      >
        攻略
      </view>
      <view class="relative top-[0.5rem-1px] h-10">
        <ant-tabs
          :style="{ width: '100%' }"
          :items="typeItems"
          @change="tapsChange"
        />
      </view>
    </view>
    <view :style="{ height: `${menuButtonTop}px` }" class="mt-[4.5rem]" />
    <scroll-view
      :scroll-y="true"
      :scroll-with-animation="true"
      :show-scrollbar="false"
    >
      <GuideSkeleton v-show="isLoading" />
      <view class="w-screen grid grid-cols-[1fr_1fr]" v-show="!isLoading">
        <GuideCard v-for="i in 20" :no-left-margin="i % 2 === 0" :key="i" />
      </view>
    </scroll-view>
  </view>
  <view
    class="bg-white fixed bottom-8 left-1/2 -translate-x-1/2 shadow-lg rounded-full"
  >
    <button class="p-2 btn-clear rounded-full">
      <image
        src="/static/guide/plus.svg"
        :style="{ height: '2.5rem', width: '2.5rem' }"
      />
    </button>
  </view>
</template>

<script setup lang="ts">
import GuideCard from "@/components/GuideCard/GuideCard.vue";
import GuideSkeleton from "@/components/GuideSkeleton/GuideSkeleton.vue";
import { ref } from "vue";

const { top: menuButtonTop } = uni.getMenuButtonBoundingClientRect();
const isLoading = ref(true);
const typeItems = ref([
  {
    title: "推荐",
    subTitle: "desc",
    content: "watermelon",
  },
  {
    title: "攻略",
    subTitle: "desc",
    badge: true,
    content: "tomato",
  },
  {
    title: "自拍",
    subTitle: "desc",
    content: "monkey",
  },
  {
    title: "交友",
    subTitle: "desc",
    content: "monkey",
  },
  {
    title: "美食",
    subTitle: "desc",
    content: "monkey",
  },
]);
const tapsChange = (e: AntdMiniTapsCustomEventType) => {
  console.log(e.detail);
};
</script>

<style scoped lang="scss">
:deep(.ant-tabs-bar-basic-title) {
  font-weight: 400;
  font-size: 1rem;
}

.btn-clear {
  &::after {
    border: none;
  }
}
</style>
