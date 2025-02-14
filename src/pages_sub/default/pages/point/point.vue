<template>
  <view>
    <uni-list v-if="!isStar" :border="true">
      <uni-list-chat
        v-for="(point, index) in mapStore.pointList"
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
          <text class="chat-custom-text">打卡点</text>
          <uni-icons type="star-filled" color="#999" size="18" />
        </view>
      </uni-list-chat>
    </uni-list>
    <uni-list v-else :border="true">
      <uni-list-chat
        v-for="(point, index) in userStore.starPoint"
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
          <text class="chat-custom-text">已收藏</text>
          <uni-icons type="star-filled" color="#999" size="18" />
        </view>
      </uni-list-chat>
    </uni-list>
    <view
      v-show="userStore.starPoint.length === 0 && isStar"
      class="w-screen h-screen flex justify-center items-center"
    >
      暂无收藏地点
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useGuideStore, useUserStore } from "@/stores";
import { useMapStore } from "@/stores/modules/useMapStore";

const guideStore = useGuideStore();
const userStore = useUserStore();
const mapStore = useMapStore();
const isGuid = ref(false);
const isStar = ref(false);
const handleTapList = (id: number, index: number) => {
  if (!isGuid.value)
    uni.navigateTo({
      url: `/pages_sub/default/pages/pointDetail/pointDetail?id=${id}&index=${index}`,
    });
  else {
    guideStore.createPostPoint = { id, name: mapStore.pointList[index].title };
    uni.navigateBack({
      animationType: "pop-out",
    });
  }
};
onLoad((options) => {
  isGuid.value =
    (options as { mode: "guide" | "star" | undefined }).mode === "guide";
  isStar.value =
    (options as { mode: "guide" | "star" | undefined }).mode === "star";
});
</script>

<style scoped lang="scss">
.chat-custom-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.chat-custom-text {
  font-size: 12px;
  color: #999;
}
</style>
