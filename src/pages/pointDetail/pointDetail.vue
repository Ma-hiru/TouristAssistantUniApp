<template>
  <view class="flex justify-center items-center w-screen h-screen">
    这是地点{{ id }}的详情
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const id = ref(0);
onLoad((options) => {
  id.value = (options as { id: number }).id;
});
</script>

<style scoped lang="scss"></style>
