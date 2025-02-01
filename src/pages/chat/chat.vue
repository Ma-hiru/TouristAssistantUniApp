<template>
  <view class="w-full h-full z-0">
    <scroll-view
      class="scroll-content z-10 h-full"
      :scroll-y="true"
      :scroll-with-animation="true"
      :show-scrollbar="false"
      :scroll-into-view="scrollIntoViewId"
      :scroll-top="scrollTop"
    >
      <Message
        v-for="(msg, index) in chatStore.chatList"
        :type="msg.type"
        :time="msg.time"
        :text="msg.content"
        :key="index"
        :id="'item-' + index"
        :is-type-text="msg.isAdd"
        :scroll-to-bottom="scrollToBottom"
      />
      <view class="h-20" />
    </scroll-view>
    <ChatInput
      class="z-50"
      placeholder="快来询问热门的景点信息吧~"
      :on-send="onSend"
    />
  </view>
</template>

<script setup lang="ts">
import Message from "@/components/Message/index.vue";
import ChatInput from "@/components/ChatInput/index.vue";
import { GetTime } from "@/utils";
import { useChatStore } from "@/stores/modules/useChatStore";
import { ref } from "vue";
import { throttle } from "lodash";

const chatStore = useChatStore();
const scrollIntoViewId = ref("");
const scrollTop = ref(0);

function onSend(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    chatStore.sendText({
      id: undefined,
      userId: 1,
      content: text,
      type: "user",
      time: GetTime(),
      isAdd: true,
    });
    scrollToBottom();
    resolve(true);
  });
}

const scrollToBottom = throttle(() => {
  scrollTop.value = 99999 + Math.random() * 100;
}, 100);
</script>

<style scoped lang="scss">
.scroll-content {
  height: calc(100vh);
}
</style>
