<template>
  <view class="w-full h-full z-0">
    <scroll-view
      class="scroll-content z-10 h-full"
      :scroll-y="true"
      :scroll-with-animation="true"
      :show-scrollbar="false"
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
        ref="messageRef"
      />
      <ChatWelcome v-if="chatStore.chatList.length === 0" />
      <view class="h-20" />
    </scroll-view>
    <ChatInput
      class="z-50"
      placeholder="快来询问热门的景点信息吧~"
      :on-send="onSend"
      :loading="sendLoading"
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

const chatStore = useChatStore();
const scrollTop = ref(0);
const sendLoading = ref(false);
const messageRef = ref<InstanceType<typeof Message>>();

function onSend(text: string): Promise<boolean> {
  sendLoading.value = true;
  return new Promise((resolve) => {
    chatStore.sendText({
      id: 114,
      userId: 1,
      content: text,
      type: "user",
      time: GetTime(),
      isAdd: true,
    });
    scrollToBottom();
    setTimeout(() => (sendLoading.value = false), 1500);
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
