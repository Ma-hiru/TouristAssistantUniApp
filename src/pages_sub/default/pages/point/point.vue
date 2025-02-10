<template>
  <view>
    <uni-list>
      <uni-list :border="true">
        <!-- 自定义右侧内容 -->
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
            <text class="chat-custom-text">推荐</text>
            <uni-icons type="star-filled" color="#999" size="18" />
          </view>
        </uni-list-chat>
      </uni-list>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useGuideStore } from "@/stores";
import { useMapStore } from "@/stores/modules/useMapStore";
const guideStore = useGuideStore();
const mapStore = useMapStore();
const isGuid = ref(false);
const handleTapList = (id: number, index: number) => {
  if (!isGuid.value)
    uni.navigateTo({
      url: `/pages_sub/default/pages/pointDetail/pointDetail?id=${id}&index=${index}`,
    });
  else {
    guideStore.createPostPoint = { id, name: `地点${id}` };
    uni.navigateBack({
      animationType: "pop-out",
    });
  }
};
onLoad((options) => {
  isGuid.value = (options as { mode: "guide" | undefined }).mode === "guide";
});
</script>

<style scoped lang="scss">
.chat-custom-right {
  flex: 1;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.chat-custom-text {
  font-size: 12px;
  color: #999;
}
</style>
