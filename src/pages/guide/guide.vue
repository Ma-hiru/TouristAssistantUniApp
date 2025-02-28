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
          :items="guideStore.postCategoryList"
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
      <view
        class="w-screen grid grid-cols-[1fr_1fr] columns-2"
        v-show="!isLoading"
      >
        <GuideCard
          v-for="(post, index) in guideStore.postList"
          v-show="
            post.category.find(
              (i) => i.id === guideStore.postCategoryList[currentTags].id
            )
          "
          :id="post.id"
          :no-left-margin="index % 2 !== 0"
          :key="post.id"
          :like="post.likes"
          :username="post.nickname"
          :content="post.title"
          :cover="post.cover"
          :avatar="post.avatar"
        />
      </view>
    </scroll-view>
  </view>
  <view
    class="bg-white fixed bottom-8 left-1/2 -translate-x-1/2 shadow-lg rounded-full"
  >
    <button class="p-2 btn-clear rounded-full" @tap="createPost">
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
import { onMounted, ref } from "vue";
import { AntdMiniTapsCustomEventType } from "@/types/guide";
import { useGuideStore } from "@/stores";

const guideStore = useGuideStore();
const { top: menuButtonTop } = uni.getMenuButtonBoundingClientRect();
const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => (isLoading.value = false), 200);
});
const typeItems = ref([
  {
    title: "推荐",
  },
  {
    title: "攻略",
  },
  {
    title: "自拍",
  },
  {
    title: "交友",
  },
  {
    title: "美食",
  },
]);
const currentTags = ref(0);
const tapsChange = (e: AntdMiniTapsCustomEventType) => {
  isLoading.value = true;
  currentTags.value = e.detail;
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
};
const createPost = () => {
  uni.navigateTo({ url: "/pages_sub/default/pages/createPost/createPost" });
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
