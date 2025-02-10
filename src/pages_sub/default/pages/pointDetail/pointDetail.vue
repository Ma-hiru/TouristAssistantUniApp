<template>
  <view class="w-screen h-screen bg-gray-200">
    <image
      style="width: 100%"
      mode="widthFix"
      :src="currentPoint?.detail.cover"
    />
    <view
      class="w-full rounded-b-xl bg-white p-4 flex flex-col justify-center items-start"
    >
      <text class="text-2xl font-bold border-b-2 border-blue-300">
        {{ currentPoint?.title }}
      </text>
      <view>
        <text class="select-auto text-[#333]"
          >{{ currentPoint?.detail.content }}
        </text>
      </view>
      <ant-divider />
      <view
        class="flex flex-col items-start justify-center space-y-2 mt-8 font-bold"
      >
        <text>地理位置：{{ currentPoint?.detail.position }}</text>
        <text>开放时间：{{ currentPoint?.detail.time }}</text>
        <text>门票价格：{{ currentPoint?.detail.price }}</text>
        <text>官方电话：{{ currentPoint?.detail.tel }}</text>
      </view>
    </view>
    <view class="fixed w-full bottom-0 pb-0 pt-2 bg-white">
      <view class="flex items-center justify-around w-full">
        <button class="flex items-center flex-col clear-btn" @tap="like">
          <image
            :src="likeSvg"
            :style="{ height: '2rem', width: '2rem' }"
            v-show="isLike"
          />
          <image
            v-show="!isLike"
            :src="likeNoneSvg"
            :style="{ height: '2rem', width: '2rem' }"
          />
          <text class="text-sm">点赞</text>
        </button>
        <button class="flex items-center flex-col clear-btn" @tap="star">
          <image
            :src="starSvg"
            :style="{ height: '2rem', width: '2rem' }"
            v-show="isStar"
          />
          <image
            v-show="!isStar"
            :src="starNoneSvg"
            :style="{ height: '2rem', width: '2rem' }"
          />
          <text class="text-sm">收藏</text>
        </button>
        <button class="flex items-center flex-col clear-btn">
          <image :src="planeSvg" :style="{ height: '2rem', width: '2rem' }" />
          <text class="text-sm">前往</text>
        </button>
        <button class="flex items-center flex-col clear-btn" open-type="share">
          <image :src="shareSvg" :style="{ height: '2rem', width: '2rem' }" />
          <text class="text-sm">分享</text>
        </button>
      </view>
      <view
        class="w-full"
        :style="{
          height: safeAreaInsets.bottom + 'px',
          transition: 'height 0.3s',
        }"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { Point } from "@/types/map";
import { useMapStore } from "@/stores/modules/useMapStore";
import likeSvg from "@/pages_sub/default/static/post/like.svg";
import likeNoneSvg from "@/pages_sub/default/static/post/like_none.svg";
import planeSvg from "@/pages_sub/default/static/pointDetail/plane.svg";
import starSvg from "@/pages_sub/default/static/pointDetail/star.svg";
import starNoneSvg from "@/pages_sub/default/static/pointDetail/star_none.svg";
import shareSvg from "@/pages_sub/default/static/post/share.svg";

const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const isLike = ref(false);
const like = () => {
  isLike.value = !isLike.value;
};
const isStar = ref(false);
const star = () => {
  isStar.value = !isStar.value;
};
const currentPoint = ref<Point>();
const mapStore = useMapStore();
onLoad((options) => {
  currentPoint.value =
    mapStore.pointList[(options as { id: number; index: number }).index];
});
</script>

<style scoped lang="scss"></style>
