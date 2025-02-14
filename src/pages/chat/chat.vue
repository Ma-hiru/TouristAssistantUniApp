<template>
  <view class="w-screen h-screen z-0 relative">
    <view class="top-bar w-screen top-0 left-0 z-[60] fixed">
      <view
        :style="{ marginTop: `${menuButtonTop}px`, marginBottom: '0.5rem' }"
        class="h-8 w-8"
      />
    </view>
    <view
      class="fixed w-screen top-0 left-0 z-[70]"
      :style="{ paddingTop: `${menuButtonTop}px` }"
    >
      <view class="p-2 inline-block">
        <view class="flex space-x-4">
          <image
            @tap="chatStore.newChat"
            src="/static/chat/newChat.svg"
            style="width: 1.7rem; height: 1.7rem"
            class="ml-2 -mt-1 z-20"
          />
          <image
            @tap="mute"
            v-show="!chatStore.isMute"
            src="/static/chat/volume_on.svg"
            style="width: 1.7rem; height: 1.7rem"
            class="ml-2 -mt-1 z-20"
          />
          <image
            @tap="mute"
            v-show="chatStore.isMute"
            src="/static/chat/volume_off.svg"
            style="width: 1.7rem; height: 1.7rem"
            class="ml-2 -mt-1 z-20"
          />
        </view>
      </view>
      <view
        class="absolute left-1/2 top-1 z-[40] -translate-x-1/2"
        :style="{ marginTop: `${menuButtonTop}px` }"
      >
        <text class="font-bold" @tap="handleTapTile">{{ title }}</text>
      </view>
      <view class="h-2" />
    </view>
    <scroll-view
      class="max-h-screen z-10"
      :scroll-y="true"
      :scroll-with-animation="true"
      :show-scrollbar="false"
      :scroll-top="scrollTop"
    >
      <view :style="{height: `${safeAreaInsets!.top}px`}" class="mt-8" />
      <Message
        v-for="(msg, index) in chatStore.chatList"
        :type="msg.type"
        :time="msg.time"
        :text="msg.content"
        :polyline="msg.polyline"
        :key="index"
        :id="msg.id"
        :scroll-to-bottom="scrollToBottom"
      />
      <ChatWelcome v-if="chatStore.chatList.length === 0" :on-send="onSend" />
      <view class="h-20" />
    </scroll-view>
    <ChatInput
      placeholder="快来询问热门的景点信息吧~"
      :on-send="onSend"
      :is-show-top-btn="true"
      :handle-top-btn="scrollToBottom"
      :scroll-to-bottom="scrollToBottom"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GetTime } from "@/utils";
import { throttle } from "lodash";
import Message from "@/components/Message/index.vue";
import ChatInput from "@/components/ChatInput/index.vue";
import ChatWelcome from "@/components/ChatWelcome/ChatWelcome.vue";
import { useChatStore } from "@/stores/modules/useChatStore";
import { useLocation } from "@/hooks";
import { defaultVolume, useVolume } from "@/hooks/useAudio";

const safeAreaInsets = uni.getWindowInfo().safeAreaInsets;
const { top: menuButtonTop } = uni.getMenuButtonBoundingClientRect();
const chatStore = useChatStore();
const scrollTop = ref(0);
const sendLoading = ref(false);
const title = ref("随身小D");

async function onSend(text: string): Promise<boolean> {
  sendLoading.value = true;
  const location = await useLocation();
  return new Promise((resolve) => {
    chatStore.sendText(
      {
        id: 114,
        content: text,
        type: "user",
        time: GetTime(),
        polyline: {
          isPolyline: false,
          polyline: [],
        },
        location,
        hasSlice: false,
      },
      () => {
        scrollToBottom();
        resolve(true);
      },
      () => {
        resolve(false);
      }
    );
    setTimeout(() => (sendLoading.value = false), 1500);
  });
}

const scrollToBottom = throttle(() => {
  scrollTop.value = 99999 + Math.random() * 100;
}, 800);
const scrollToTop = throttle(() => {
  console.log("top");
  scrollTop.value = 0;
}, 800);
const lastTap = ref();
const handleTapTile = () => {
  const currentTapTime = Date.now(); // 当前点击的时间戳
  const lastTapTime = lastTap.value || 0; // 上一次点击的时间戳
  if (currentTapTime - lastTapTime < 300) {
    scrollToTop();
  } else {
    lastTap.value = currentTapTime;
  }
};

const mute = () => {
  chatStore.isMute = !chatStore.isMute;
  if (chatStore.isMute) useVolume(0);
  else useVolume(defaultVolume);
};
</script>

<style scoped lang="scss">
.top-bar {
  backdrop-filter: blur(10px) !important;
  background-color: rgb(255 255 255 / 0.4) !important;
}
</style>
