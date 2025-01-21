<template>
  <view v-if="props.type === 'user'"> userMessage </view>
  <view v-else-if="props.type === 'assistant'"> assistantMessage </view>
  <view v-else> systemMessage </view>
</template>

<script setup lang="ts" name="Message">
const props = defineProps<{
  type: "user" | "system" | "assistant";
}>();
</script>

<style scoped lang="scss"></style>
