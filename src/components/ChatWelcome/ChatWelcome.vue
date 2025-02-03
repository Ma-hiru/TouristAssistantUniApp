<template>
  <view>
    <view class="p-4">
      <ant-welcome
        title="👋🏻 你好，我是 Ant Design X"
        description="基于 Ant Design 的 AGI 产品界面解决方案，创造更美好的智能视界～"
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

const baseList = ref<AntdMiniPromptsItem[]>([
  {
    showArrow: true,
    label: "热门话题:",
    description: "",
    icon: "",
    key: "1",
  },
  {
    showArrow: true,
    label: "组件查询:",
    icon: "",
    description: "欢迎组件",
    key: "2",
  },
  {
    showArrow: true,
    label: "新手帮助:",
    icon: "",
    description: "如何实现快速安装和引入",
    key: "3",
  },
]);
const promptsTitle = ref("我可以帮您：");

function onItemTap(e: AntdMiniPromptsCustomEventType) {
  const [item, index] = e.detail;
  console.log("e=>", item.label, index);
}
</script>

<style scoped lang="scss"></style>
