<template>
  <view class="pl-4 pr-4 absolute w-full bottom-4 z-50">
    <view
      class="z-50 border border-solid border-s bg-gray-100 border-gray-100 shadow-lg flex justify-center items-center rounded-2xl w-full p-2"
    >
      <view class="z-50">
        <textarea
          class="text-base z-50"
          :placeholder="props.placeholder"
          :auto-height="true"
          confirm-type="send"
          :maxlength="-1"
          :show-confirm-bar="false"
          :adjust-position="false"
          @keyboardheightchange="onKeyboardHeightChange"
          @confirm="sendMessage"
          v-model="inputText"
        />
      </view>
      <button
        class="w-12 h-12 flex justify-center items-center rounded-full bg-gray-100"
        :hover-class="'bg-gray-200'"
        @tap="sendMessage"
        :disabled="loading"
      >
        <image
          v-show="!loading"
          class="w-1/2 h-1/2 fill-black"
          src="/static/chat/send_button.svg"
          mode="aspectFit"
        />
        <wd-loading v-if="loading" color="#000000" />
      </button>
    </view>
    <view :style="{ height: keyboardHeight + 'px' }" />
  </view>
</template>

<script setup lang="ts" name="index">
import { ref } from "vue";
import { TextareaOnKeyboardheightchange } from "@uni-helper/uni-app-types";

const props = defineProps<{
  placeholder: string;
}>();
/** 文字输入 */
const inputText = ref<string>("");
const keyboardHeight = ref<number>(0);
const onKeyboardHeightChange: TextareaOnKeyboardheightchange = (e) => {
  keyboardHeight.value = e.detail.height - 50;
};
/** 发送数据 */
const loading = ref<boolean>(false);
const sendMessage = () => {
  if (inputText.value.trim() === "") {
    uni.showToast({
      title: "内容不能为空~",
      icon: "none",
    });
    return;
  }
  loading.value = true;
  uni.showLoading({
    title: "正在发送...",
  });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: "发送成功",
      icon: "success",
    });
    inputText.value = "";
    loading.value = false;
  }, 1000);
};
</script>

<style scoped lang="scss"></style>
