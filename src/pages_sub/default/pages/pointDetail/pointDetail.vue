<template>
  <view class="w-screen h-screen bg-gray-200">
    <image
      style="width: 100%"
      mode="widthFix"
      :src="currentPoint?.detail.cover"
      @tap="previewImage"
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
        <view class="grid grid-cols-[auto_1fr]">
          <view class="h-full">地理位置：</view>
          <view>{{ currentPoint?.detail.position }}</view>
        </view>
        <view class="grid grid-cols-[auto_1fr]">
          <view class="h-full">开放时间：</view>
          <view>{{ currentPoint?.detail.time }}</view>
        </view>
        <view class="grid grid-cols-[auto_1fr]">
          <view class="h-full">门票价格：</view>
          <view>{{ currentPoint?.detail.price }}</view>
        </view>
        <view class="grid grid-cols-[auto_1fr]">
          <view class="h-full">官方电话：</view>
          <view>{{ currentPoint?.detail.tel }}</view>
        </view>
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
        <button class="flex items-center flex-col clear-btn" @tap="goto">
          <image :src="planeSvg" :style="{ height: '2rem', width: '2rem' }" />
          <text class="text-sm">前往</text>
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
import { useUserStore } from "@/stores";

const userStore = useUserStore();
const currentPoint = ref<Point>();
const mapStore = useMapStore();
const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const isLike = ref(false);
const like = () => {
  isLike.value = !isLike.value;
};
const isStar = ref(false);
const starIndex = ref(-1);
const pointIndex = ref(-1);
const star = () => {
  isStar.value = !isStar.value;
  if (isStar.value)
    starIndex.value = userStore.starPoint.push(currentPoint.value!) - 1;
  else userStore.starPoint.splice(starIndex.value, 1);
};
onLoad((options) => {
  const typedOptions: { id: number; index: number } = {
    id: Number((options as { id: string }).id),
    index: Number((options as { index: string }).index),
  };
  if (typedOptions.index) pointIndex.value = typedOptions.index;
  else
    mapStore.pointList.find(
      (item, index) => item.id === typedOptions.id && (pointIndex.value = index)
    );
  currentPoint.value = mapStore.pointList[pointIndex.value];
  userStore.starPoint.find(
    (item, index) =>
      item.id === currentPoint.value?.id &&
      (isStar.value = true) &&
      (starIndex.value = index)
  );
});
const goto = () => {
  mapStore.currentMarker = {
    latitude: mapStore.markers[0].latitude,
    longitude: mapStore.markers[0].longitude,
  };
  uni.switchTab({ url: `/pages/index/index` });
};
const previewImage = () => {
  uni.previewImage({
    urls: [currentPoint.value!.detail.cover],
  });
};
</script>

<style scoped lang="scss"></style>
