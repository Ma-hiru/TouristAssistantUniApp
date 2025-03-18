<template>
  <view>
    <view
      class="flex justify-center items-center w-full min-h-64"
      @tap="divAppearance"
    >
      <ChatAppearance />
    </view>
    <view class="p-4">
      <ant-welcome
        title="👋🏻 你好，我是 小D"
        description="基于 生成式人工智能 的AI旅游向导，点我可以更换形象哦~"
      />
      <view class="mt-4">
        <ant-prompts
          :items="baseList"
          :title="promptsTitle"
          @itemtap="onItemTap"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="ChatWelcome'">
import { ref } from "vue";
import {
  AntdMiniPromptsCustomEventType,
  AntdMiniPromptsItem,
} from "@/types/chat";
import ChatAppearance from "@/components/ChatAppearance/ChatAppearance.vue";
import { defaultChatWelcomeText } from "@/settings";
const props = defineProps<{
  onSend: (text: string) => void;
}>();
const baseList = ref<AntdMiniPromptsItem[]>(defaultChatWelcomeText);
const promptsTitle = ref("你可以这样问我：");

function divAppearance() {
  uni.navigateTo({ url: "/pages_sub/default/pages/appearance/appearance" });
}

function onItemTap(e: AntdMiniPromptsCustomEventType) {
  const [item, index] = e.detail;
  console.log("e=>", item.label, index);
  props.onSend(item.description);
}
</script>

<style scoped lang="scss"></style>
