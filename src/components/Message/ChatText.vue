<template>
  <view
    class="bg-gray-200 p-4 rounded-xl select-auto -top-2 relative font-bold w-auto inline-block"
  >
    <text>{{ curText }}</text>
  </view>
</template>

<script setup lang="ts" name="ChatText">
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const props = defineProps<{
  text: string;
  isTypeText: boolean;
}>();
const curIndex = ref<number>(0);
const speed = ref<number>(50);
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
};
onLoad(() => {
  if (props.isTypeText) start();
  else curIndex.value = props.text.length - 1;
});
defineExpose({ start, pause, conti, reset });
</script>

<style scoped lang="scss"></style>
