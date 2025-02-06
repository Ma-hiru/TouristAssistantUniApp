<template>
  <view>
    <view class="flex justify-center items-center h-56 w-64 m-auto">
      形象待定......
    </view>
    <view class="p-4">
      <ant-welcome
        title="👋🏻 你好，我是 小D"
        description="基于 生成式人工智能 的AI旅游向导，正在为您服务～"
      />
      <ant-prompts
        :items="baseList"
        :title="promptsTitle"
        @itemtap="onItemTap"
      />
    </view>
  </view>
</template>

<script setup lang="ts" name="ChatWelcome'">
import { ref } from "vue";
import {
  AntdMiniPromptsCustomEventType,
  AntdMiniPromptsItem,
} from "@/types/chat";

const props = defineProps<{
  onSend: (text: string) => void;
}>();
const baseList = ref<AntdMiniPromptsItem[]>([
  {
    showArrow: true,
    label: "热门提问：",
    description: "介绍一下xxx吧！",
    icon: "",
    key: "1",
  },
  {
    showArrow: true,
    label: "路线规划：",
    icon: "",
    description: "一小时的速览路线~",
    key: "2",
  },
  {
    showArrow: true,
    label: "讲解一下：",
    icon: "",
    description: "我在什么景点处？",
    key: "3",
  },
]);
const promptsTitle = ref("为你推荐：");

function onItemTap(e: AntdMiniPromptsCustomEventType) {
  const [item, index] = e.detail;
  console.log("e=>", item.label, index);
  props.onSend(item.description);
}
</script>

<style scoped lang="scss"></style>
