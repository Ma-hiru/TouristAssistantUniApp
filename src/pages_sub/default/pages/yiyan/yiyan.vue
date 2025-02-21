<template>
  <web-view :src="url"></web-view>
</template>

<script setup lang="ts">
import { DetailYIYANURL } from "@/settings";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const url = ref(DetailYIYANURL);
onLoad((options) => {
  url.value += (options as { uuid: string }).uuid;
});
</script>

<style scoped lang="scss"></style>
