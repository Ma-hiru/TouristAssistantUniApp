<template>
  <view class="w-screen h-screen relative bg-gray-200">
    <Header title="攻略">
      <ant-tabs
        class="relative"
        :style="{ width: '100%' }"
        :items="guideStore.postCategoryList"
        @change="tapsChange"
      />
    </Header>
    <GuideSkeleton v-show="isLoading" />
    <scroll-view
      :scroll-y="true"
      :scroll-with-animation="true"
      :show-scrollbar="false"
      class="h-screen"
    >
      <view
        class="w-full grid grid-cols-2"
        :style="{ paddingTop: `${AppConf.HeaderHeight + 70}rpx` }"
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
      <BottomTips tips="划到底了，休息一下吧~" />
    </scroll-view>
    <view
      class="bg-white fixed bottom-[64rpx] left-1/2 -translate-x-1/2 shadow-lg rounded-full"
    >
      <button class="p-2 btn-clear rounded-full" @tap="createPost">
        <image src="/static/guide/plus.svg" class="h-[80rpx] w-[80rpx]" />
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import GuideCard from "@/components/GuideCard/GuideCard.vue";
import GuideSkeleton from "@/components/GuideSkeleton/GuideSkeleton.vue";
import { onMounted, ref } from "vue";
import { AntdMiniTapsCustomEventType } from "@/types/guide";
import { useGuideStore } from "@/stores";
import AppConf from "@/settings/index";

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
