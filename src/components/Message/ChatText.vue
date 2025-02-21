<template>
  <view
    class="bg-[#e5e7eb] rounded-xl select-text -top-2 relative font-bold w-auto inline-block overflow-hidden"
    :class="{
      'rounded-tr-none': cornerPosition === 'right',
      'rounded-tl-none': cornerPosition === 'left',
    }"
  >
    <view class="max-w-[calc(100vw-10rem)] break-words pl-2 pr-2">
      <towxml :nodes="content" />
    </view>
  </view>
</template>

<script setup lang="ts" name="ChatText">
import { onMounted, ref, watch } from "vue";
import { useTowxml } from "@/wxcomponents/towxml";
import { useChatStore } from "@/stores/modules/useChatStore";

const chatStore = useChatStore();
const props = defineProps<{
  text: string;
  cornerPosition: "left" | "right";
  scrollToBottom: () => void;
}>();
const content = ref(null);
content.value = useTowxml(props.text, "markdown", {
  theme: "light",
});
const stop = watch(
  () => props.text,
  () => {
    content.value = useTowxml(props.text, "markdown", {
      theme: "light",
    });
    props.scrollToBottom();
  }
);
//TODO 回收内存
const unwatch = watch(
  () => chatStore.isStop,
  () => {
    if (chatStore.isStop) {
      chatStore.isStop = false;
      chatStore.stopChat();
      unwatch();
      stop();
    }
  }
);
onMounted(() => {
  if (props.cornerPosition === "right") {
    stop();
    unwatch();
  }
});
</script>

<style scoped lang="scss"></style>
