<template>
  <view class="w-16 h-16 flex justify-center items-center relative top-4">
    <ant-avatar :src="src[props.type]" />
  </view>
</template>

<script setup lang="ts" name="ChatAvatar">
import { computed, Ref, ref, watch } from "vue";
import { useChatStore } from "@/stores/modules/useChatStore";
import { useUserStore } from "@/stores";

const chatStore = useChatStore();
const userStore = useUserStore();
const src = computed(() => {
  const assistant = chatStore.avatarList[chatStore.avatarIndex];
  const user =
    userStore.userProfile.avatar || "../../../static/user/avatar_default.jpg";
  const system = "";
  return {
    assistant,
    user,
    system,
  };
});
const props = defineProps<{
  type: keyof (typeof src extends Ref<infer P> ? P : Record<string, string>);
}>();
</script>

<style scoped lang="scss"></style>
