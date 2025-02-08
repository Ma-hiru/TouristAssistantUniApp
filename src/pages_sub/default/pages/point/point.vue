<template>
  <view>
    <uni-list>
      <uni-list :border="true">
        <!-- 自定义右侧内容 -->
        <uni-list-chat
          :clickable="true"
          title="地点1"
          link
          @click="handleTapList(1)"
          avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="简介"
          time="2020-02-02 20:20"
          badge-positon="left"
        >
          <view class="chat-custom-right">
            <text class="chat-custom-text">推荐</text>
            <!-- 需要使用 uni-icons 请自行引入 -->
            <uni-icons type="star-filled" color="#999" size="18"></uni-icons>
          </view>
        </uni-list-chat>
        <uni-list-chat
          :clickable="true"
          title="地点2"
          link
          @click="handleTapList(2)"
          avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="简介"
          time="2020-02-02 20:20"
          badge-positon="left"
        >
          <view class="chat-custom-right">
            <text class="chat-custom-text">最近</text>
            <!-- 需要使用 uni-icons 请自行引入 -->
            <uni-icons type="star-filled" color="#999" size="18"></uni-icons>
          </view>
        </uni-list-chat>
        <uni-list-chat
          v-for="i in 20"
          :title="`地点${i + 2}`"
          :key="i"
          :clickable="true"
          link
          @click="handleTapList(i + 2)"
          avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="简介"
          time="2020-02-02 20:20"
          badge-positon="left"
        >
          <view class="chat-custom-right"></view>
        </uni-list-chat>
      </uni-list>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useGuideStore } from "@/stores";
const guideStore = useGuideStore();
const avatarList = ref([
  {
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
  },
  {
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
  },
  {
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
  },
]);
const isGuid = ref(false);
const handleTapList = (id: number) => {
  if (!isGuid.value)
    uni.navigateTo({
      url: `/pages_sub/default/pages/pointDetail/pointDetail?id=${id}`,
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
