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
import { computed, onMounted, ref, watch } from "vue";
import { useTowxml } from "@/wxcomponents/towxml";

const props = defineProps<{
  text: string;
  isTypeText: boolean;
  cornerPosition: "left" | "right";
  scrollToBottom: () => void;
}>();
const curIndex = ref<number>(0);
const speed = ref<number>(20);
const timer = ref<number>();
const startIndex = ref<number>(0);
const isPause = ref<boolean>(false);
const curText = computed(() => {
  return props.text.slice(0, curIndex.value);
});
const start = () => {
  curIndex.value = startIndex.value - 1;
  writeText();
};
const pause = () => {
  isPause.value = true;
  clearTimeout(timer.value);
};
const conti = () => {
  isPause.value = false;
  writeText();
};
const reset = () => {
  isPause.value = false;
  clearTimeout(timer.value);
  start();
};
const writeText = () => {
  curIndex.value++;
  if (curIndex.value > props.text.length) isPause.value = true;
  if (!isPause.value) timer.value = setTimeout(writeText, speed.value);
  props.scrollToBottom();
};
onMounted(() => {
  if (props.isTypeText) start();
  else curIndex.value = props.text.length;
});
defineExpose({ start, pause, conti, reset });
const content = ref(null);
watch(curText, () => {
  content.value = useTowxml(curText.value, "markdown", {
    theme: "light",
  });
});
</script>

<style scoped lang="scss"></style>
