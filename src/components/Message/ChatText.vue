<template>
  <view
    class="bg-[#e5e7eb] rounded-xl select-text -top-2 relative font-bold w-auto inline-block overflow-hidden"
    :class="{
      'rounded-tr-none': cornerPosition === 'right',
      'rounded-tl-none': cornerPosition === 'left',
    }"
  >
    <view class="max-w-[calc(100vw-10rem)] break-words pl-2 pr-2">
      <!--      {{ curText }}-->
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
const stop = watch(
  () => props.text,
  () => {
    content.value = useTowxml(props.text, "markdown", {
      theme: "light",
    });
    props.scrollToBottom();
  }
);
const unwatch = watch(
  () => chatStore.isStop,
  () => {
    if (chatStore.isStop) {
      stop();
      unwatch();
      chatStore.isStop = false;
      chatStore.stopChat();
    }
  }
);
onMounted(() => {
  if (props.cornerPosition === "right") {
    stop();
    unwatch();
  }
});
// const curIndex = ref<number>(0);
// const speed = ref<number>(20);
// const timer = ref<number>();
// const isPause = ref<boolean>(false);
// const curText = computed(() => {
//   return props.text.slice(0, curIndex.value);
// });
// chatStore.isTyping = props.isTypeText;
// watch(isPause, () => {
//   chatStore.isTyping = !isPause.value;
// });
// watch(
//   () => chatStore.isStop,
//   () => {
//     if (chatStore.isStop) {
//       console.log("watch");
//       pause();
//     }
//   }
// );
// const start = () => {
//   curIndex.value = chatStore.typingWhere - 1;
//   console.log(chatStore.typingWhere);
//   writeText();
// };
// const pause = () => {
//   isPause.value = true;
//   chatStore.isStop = false;
//   clearTimeout(timer.value);
//   console.log("pause");
//   chatStore.typeComplete();
// };
// const conti = () => {
//   isPause.value = false;
//   writeText();
// };
// const reset = () => {
//   isPause.value = false;
//   clearTimeout(timer.value);
//   start();
// };
// const writeText = () => {
//   curIndex.value++;
//   chatStore.typingWhere = curIndex.value;
//   if (curIndex.value > props.text.length) {
//     isPause.value = true;
//     chatStore.typeComplete();
//     return;
//   }
//   if (!isPause.value) timer.value = setTimeout(writeText, speed.value);
//   props.scrollToBottom();
// };
// onMounted(() => {
//   if (props.isTypeText) start();
//   else curIndex.value = props.text.length;
// });
// watch(curText, () => {
//   content.value = useTowxml(curText.value, "markdown", {
//     theme: "light",
//   });
// });
</script>

<style scoped lang="scss"></style>
