<template>
  <view v-if="props.type === 'user'">
    <view class="flex flex-col justify-start">
      <view class="w-full flex justify-end items-center">
        <ChatTime :time="props.time" />
        <ChatAvatar :type="props.type" />
      </view>
      <view class="w-full pl-16 pr-16 text-right">
        <ChatText :text="props.text" :is-type-text="false" />
      </view>
    </view>
  </view>
  <view v-else-if="props.type === 'assistant'">
    <view class="flex flex-col justify-start">
      <view class="w-full flex justify-start items-center">
        <ChatAvatar :type="props.type" />
        <ChatTime :time="props.time" />
      </view>
      <view class="w-full pl-16 pr-16 text-left">
        <ChatText :text="props.text" :is-type-text="true" />
      </view>
    </view>
  </view>
  <view v-else class="text-center w-full pl-16 pr-16 block">
    <view class="bg-gray-100 text-sm mt-4">
      <text>{{ props.text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts" name="Message">
import ChatAvatar from "@/components/Message/ChatAvatar.vue";
import ChatTime from "@/components/Message/ChatTime.vue";
import ChatText from "@/components/Message/ChatText.vue";

const props = defineProps<{
  type: "user" | "system" | "assistant";
  time: string;
  text: string;
}>();
</script>

<style scoped lang="scss"></style>
