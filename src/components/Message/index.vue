<template>
  <view v-if="props.type === 'user'">
    <view class="flex flex-col justify-start">
      <view class="w-full flex justify-end items-center">
        <ChatTime :time="props.time" />
        <ChatAvatar :type="props.type" />
      </view>
      <view class="w-full max-w-full pl-16 pr-16 flex justify-end">
        <ChatText
          :text="props.text"
          :is-type-text="false"
          corner-position="right"
          :scroll-to-bottom="props.scrollToBottom"
        />
      </view>
    </view>
  </view>
  <view v-else-if="props.type === 'assistant'">
    <view class="flex flex-col justify-start">
      <view class="w-full flex justify-start items-center">
        <ChatAvatar :type="props.type" />
        <ChatTime :time="props.time" />
      </view>
      <view class="w-full pl-16 pr-16 flex justify-end items-start flex-col">
        <ChatText
          :text="props.text"
          corner-position="left"
          :scroll-to-bottom="props.scrollToBottom"
        />
        <button
          class="clear-btn flex justify-center items-center text-sm p-1 bg-blue-50"
          @tap="choosePolyline"
        >
          <image
            src="/static/chat/location.svg"
            :style="{ height: '1.25rem', width: '1.25rem' }"
          />
          选择路线
        </button>
      </view>
    </view>
  </view>
  <view v-else class="text-center w-full pl-16 pr-16 block">
    <view class="bg-gray-100 text-sm mt-4">
      <text>{{ props.text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts" name="Message">
import ChatAvatar from "@/components/Message/ChatAvatar.vue";
import ChatTime from "@/components/Message/ChatTime.vue";
import ChatText from "@/components/Message/ChatText.vue";
import type { MapPolyline } from "@uni-helper/uni-app-types";
import { useAudio } from "@/hooks/useAudio";
//TODO 适配大屏的消息
//TODO 路线采纳按钮
const props = defineProps<{
  type: "user" | "system" | "assistant";
  time: string | undefined;
  polyline: {
    isPolyline: boolean;
    polyline: MapPolyline[];
  };
  text: string;
  scrollToBottom: () => void;
}>();
const choosePolyline = () => {
  uni.switchTab({ url: "/pages/index/index" });
};
//TODO 音频播放
// const ctx = useAudio("https://shiina-mahiru.cn/download/test.mp3");
// console.log(ctx);
// ctx.play();
</script>

<style scoped lang="scss"></style>
