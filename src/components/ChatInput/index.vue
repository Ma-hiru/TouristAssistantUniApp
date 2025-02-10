<template>
  <view class="pl-2 pr-2 fixed bottom-4 z-50 flex flex-col items-end w-full">
    <view class="absolute hidden -top-16 bg-white" v-show="props.isShowTopBtn">
      <button
        @tap="props.scrollToBottom"
        class="w-12 h-12 flex justify-center items-center shadow-lg"
      >
        <ant-icon type="DownOutline" />
      </button>
    </view>
    <view
      class="z-50 border border-solid border-s bg-white border-gray-100 shadow-lg flex justify-center items-end rounded-xl w-full p-1 relative"
    >
      <view class="h-12 flex justify-center items-center">
        <button
          class="w-10 h-10 flex justify-center items-center rounded-full relative border-gray-100 border clear-btn"
          @tap="voiceInput"
        >
          <image
            v-show="!isVoiceInput"
            class="w-8 h-8"
            src="/static/chat/voice.svg"
            mode="aspectFit"
          />
          <image
            v-show="isVoiceInput"
            class="w-8 h-8"
            src="/static/chat/keyboard.svg"
            mode="aspectFit"
          />
        </button>
      </view>
      <view
        class="h-12 flex-auto flex justify-center items-center"
        v-show="isVoiceInput && !isTapping"
        @touchstart="tapStart"
        @touchend="tapEnd"
      >
        <text class="text-[#999]">长按说话，松手发送</text>
      </view>
      <view
        class="h-12 flex-auto flex justify-center items-center"
        v-show="isVoiceInput && isTapping"
      >
        <view class="dots-container">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
      </view>
      <view
        class="z-50 flex flex-auto min-h-12 justify-center items-center"
        v-show="!isVoiceInput"
      >
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
      <view
        class="h-12 flex justify-center items-center"
        v-show="!isVoiceInput"
      >
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
/** 语音输入 */
const isVoiceInput = ref(false);
const isTapping = ref(false);
const voiceInput = () => {
  isVoiceInput.value = !isVoiceInput.value;
  uni.authorize({
    scope: "record",
  });
};
const recorder = uni.getRecorderManager();
const tapStart = () => {
  isTapping.value = true;
  recorder.start({
    sampleRate: 16000,
    format: "mp3",
  });
};
const tapEnd = () => {
  isTapping.value = false;
  recorder.stop();
};
recorder.onStop((res) => {
  console.log(res);
});
recorder.onError(() => {
  uni.showToast({
    title: "录音失败，请检查录音权限~",
    icon: "error",
  });
});
</script>

<style scoped lang="scss">
.dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.dot {
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: #b3d4fc;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
  margin-right: 0;
}

.dot:nth-child(1) {
  animation-delay: -0.3s;
}

.dot:nth-child(2) {
  animation-delay: -0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #6793fb;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
}
</style>
