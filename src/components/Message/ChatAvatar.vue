<template>
  <view class="w-16 h-16 flex justify-center items-center relative top-4">
    <ant-avatar :src="src[props.type]" />
  </view>
</template>

<script setup lang="ts" name="ChatAvatar">
import { Ref, ref } from "vue";

const src = ref({
  user: "../../../static/chat/user_avatar.jpg",
  assistant: "../../../static/chat/assistant_avatar.png",
  system: "",
});

const props = defineProps<{
  type: keyof (typeof src extends Ref<infer P> ? P : Record<string, string>);
}>();
</script>

<style scoped lang="scss"></style>
