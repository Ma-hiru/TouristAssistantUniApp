<template>
  <view class="content">
    <view> This is home page.</view>
    <view>
      {{ data }}
      <wd-button @tap="test">Test</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reqTest } from "../../api";
import { ref } from "vue";

const data = ref<string>("null");
const test = async () => {
  data.value = await reqTest();
};
</script>

<style lang="scss" scoped></style>
