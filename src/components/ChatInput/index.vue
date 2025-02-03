<template>
  <view class="pl-4 pr-4 absolute w-full bottom-4 z-50">
    <view
      class="z-50 border border-solid border-s bg-white border-gray-100 shadow-lg flex justify-center items-end rounded-2xl w-full p-2"
    >
      <view class="z-50 flex min-h-12 justify-center items-center">
        <textarea
          class="text-base z-50 resize-none leading-4 max-h-32"
          :placeholder="props.placeholder"
          :auto-height="true"
          confirm-type="send"
          :maxlength="300"
          :show-confirm-bar="false"
          :adjust-position="false"
          @keyboardheightchange="onKeyboardHeightChange"
          @confirm="sendMessage"
          v-model="inputText"
        />
      </view>
      <view class="h-12 flex justify-center items-center">
        <button
          class="w-10 h-10 flex justify-center items-center rounded-full bg-[#1677FF] relative"
          :hover-class="'btn-hover'"
          @tap="sendMessage"
          :disabled="loading"
        >
          <image
            v-show="!loading"
            class="w-5 h-5"
            src="/static/chat/send_button.svg"
            mode="aspectFit"
          />
          <wd-loading v-if="loading" color="#1677FF" />
        </button>
      </view>
    </view>
    <view :style="{ height: keyboardHeight + 'px' }" />
  </view>
</template>

<script setup lang="ts" name="index">
import { ref } from "vue";
import { TextareaOnKeyboardheightchange } from "@uni-helper/uni-app-types";

const props = defineProps<{
  placeholder: string;
  onSend: (text: string) => Promise<boolean>;
  loading: boolean;
}>();
/** 文字输入 */
const inputText = ref<string>("");
const keyboardHeight = ref<number>(0);
const onKeyboardHeightChange: TextareaOnKeyboardheightchange = (e) => {
  keyboardHeight.value = e.detail.height - 50;
};
/** 发送数据 */
const sendMessage = async () => {
  if (inputText.value.trim() === "") {
    await uni.showToast({
      title: "内容不能为空~",
      icon: "none",
    });
    return;
  }
  await uni.showLoading({
    title: "正在发送...",
  });
  if (await props.onSend(inputText.value)) {
    uni.hideLoading();
    await uni.showToast({
      title: "发送成功",
      icon: "success",
    });
    inputText.value = "";
  } else {
    uni.hideLoading();
    await uni.showToast({
      title: "发送失败，请检查网络~",
      icon: "error",
    });
  }
};
</script>

<style scoped lang="scss">
.btn-hover {
  background: #3086ff;
}
</style>
