<template>
  <view class="pl-4 pr-4 fixed bottom-4 z-50 flex flex-col items-end w-full">
    <view class="absolute hidden -top-16 bg-white" v-show="props.isShowTopBtn">
      <button
        @tap="props.scrollToBottom"
        class="w-12 h-12 flex justify-center items-center shadow-lg"
      >
        <ant-icon type="DownOutline" />
      </button>
    </view>
    <view
      class="z-50 border border-solid border-s bg-white border-gray-100 shadow-lg flex justify-center items-end rounded-2xl w-full p-2 relative"
    >
      <view class="z-50 flex flex-auto min-h-12 justify-center items-center">
        <textarea
          class="text-base z-50 resize-none leading-4 max-h-32 w-5/6"
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
          class="w-10 h-10 flex justify-center items-center rounded-full bg-[var(--diy-color-primary)] relative"
          :hover-class="'btn-hover'"
          @tap="handleSendOrStop"
        >
          <image
            v-show="!chatStore.isTyping"
            class="w-5 h-5"
            src="/static/chat/send_button.svg"
            mode="aspectFit"
          />
          <wd-loading v-if="chatStore.isTyping" color="#1677FF" />
        </button>
      </view>
    </view>
    <view :style="{ height: keyboardHeight + 'px', transition: 'all 0.5s' }" />
  </view>
</template>

<script setup lang="ts" name="index">
import { ref } from "vue";
import { TextareaOnKeyboardheightchange } from "@uni-helper/uni-app-types";
import { useChatStore } from "@/stores/modules/useChatStore";

const chatStore = useChatStore();
const props = defineProps<{
  placeholder: string;
  onSend: (text: string) => Promise<boolean>;
  isShowTopBtn: boolean;
  scrollToBottom: () => void;
}>();
const handleSendOrStop = () => {
  if (chatStore.isTyping) {
    chatStore.isStop = true;
  } else {
    sendMessage();
  }
};
/** 文字输入 */
const inputText = ref<string>("");
const keyboardHeight = ref<number>(0);
const onKeyboardHeightChange: TextareaOnKeyboardheightchange = (e) => {
  keyboardHeight.value = e.detail.height - 50;
};
/** 发送数据 */
const sendMessage = async () => {
  if (chatStore.isTyping) {
    await uni.showToast({
      title: "正在输入中，请稍后...",
      icon: "none",
    });
    return;
  }
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

<style scoped lang="scss"></style>
