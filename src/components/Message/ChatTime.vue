<template>
  <view class="text-sm ml-3 top-2 relative text-gray-500">
    {{ props.time }}
  </view>
</template>

<script setup lang="ts" name="ChatTime">
const props = defineProps<{
  time: string | undefined;
}>();
</script>

<style scoped lang="scss"></style>
