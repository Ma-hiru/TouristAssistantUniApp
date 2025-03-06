<template>
  <view class="h-screen w-screen grid grid-rows-[1fr_auto] grid-cols-1">
    <view class="flex justify-center items-center flex-col">
      <view v-show="displayType === 'appearance'" style="transform: scale(1)">
        <ChatAppearance />
      </view>
      <view
        v-show="displayType === 'chat'"
        class="flex justify-center w-screen"
      >
        <Message type="assistant" :time="time" text="你好，我是小D" />
      </view>
    </view>
    <view class="bg-gray-600 rounded-t-sm">
      <view class="flex justify-center space-x-6">
        <button
          class="p-2 bg-none clear-btn text-white text-xl rounded-none flex justify-center items-center pl-1 pr-1"
          @tap="displayType = 'appearance'"
          :style="displayType === 'appearance' ? styles.taps : styles.tapsNone"
        >
          <image :src="appearance" style="width: 2rem; height: 2rem" />
        </button>
        <button
          class="p-2 bg-none clear-btn text-white text-xl rounded-none flex justify-center items-center pl-1 pr-1"
          @tap="displayType = 'chat'"
          :style="displayType === 'chat' ? styles.taps : styles.tapsNone"
        >
          <image :src="avatar" style="width: 1.7rem; height: 1.7rem" />
        </button>
      </view>
      <scroll-view
        :scroll-y="true"
        v-show="displayType === 'appearance'"
        style="height: 15rem"
      >
        <view
          class="grid grid-cols-3 justify-items-center items-center p-4 pl-2 pr-2"
        >
          <button
            v-for="(appearance, index) in chatStore.appearanceList"
            class="flex justify-center items-center clear-btn text-base font-bold shadow-sm w-auto m-1"
            :style="
              index === chatStore.appearanceIndex
                ? styles.select
                : styles.unselect
            "
            :key="appearance"
            @tap="
              chatStore.changeAppearance(
                chatStore.appearanceList.indexOf(appearance)
              )
            "
          >
            <image
              :src="appearance"
              style="width: 5rem; height: 5rem"
              mode="aspectFill"
            />
          </button>
        </view>
      </scroll-view>
      <scroll-view
        :scroll-y="true"
        v-show="displayType === 'chat'"
        style="height: 15rem"
      >
        <view
          class="grid grid-cols-3 justify-items-center items-center p-4 pl-2 pr-2"
        >
          <button
            v-for="(avatar, index) in chatStore.avatarList"
            class="flex justify-center items-center clear-btn text-base font-bold shadow-sm w-auto m-1"
            :style="
              index === chatStore.avatarIndex ? styles.select : styles.unselect
            "
            :key="avatar"
            @tap="chatStore.changeAvatar(chatStore.avatarList.indexOf(avatar))"
          >
            <image
              :src="avatar"
              style="width: 5rem; height: 5rem"
              mode="aspectFill"
            />
          </button>
        </view>
      </scroll-view>
      <view class="p-12">
        <button
          @tap="save"
          class="p-3 text-base flex justify-center items-center bg-[--diy-color-primary] text-white rounded-lg"
        >
          保存形象
        </button>
        <view :style="{ height: safeArea + 'px' }" class="w-screen" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ChatAppearance from "@/components/ChatAppearance/ChatAppearance.vue";
import { useChatStore } from "@/stores/modules/useChatStore";
import Message from "@/components/Message/index.vue";
import { GetTime } from "@/utils";
import { onBeforeUnmount, onMounted, ref } from "vue";
import appearance from "@/pages_sub/default/static/appearance/appearance.svg";
import avatar from "@/pages_sub/default/static/appearance/avatar.svg";

const time = GetTime();
const chatStore = useChatStore();
const { safeArea } = uni.getWindowInfo();
const styles = {
  select: {
    padding: "1px",
    border: "1px solid yellow",
  },
  unselect: {
    border: "solid 2px rgba(45, 45, 232, 0.86)",
  },
  taps: {
    border: "none",
    borderBottom: "1px solid yellow",
  },
  tapsNone: {
    borderBottom: "1px solid rgba(0,0,0,0)",
  },
};
const displayType = ref<"chat" | "appearance">("appearance");
const currentIndex = ref();
const updateIndex = () => {
  currentIndex.value = {
    appearanceIndex: chatStore.appearanceIndex,
    avatarIndex: chatStore.avatarIndex,
  };
};
onMounted(updateIndex);
onBeforeUnmount(() => {
  chatStore.changeAppearance(currentIndex.value.appearanceIndex);
  chatStore.changeAvatar(currentIndex.value.avatarIndex);
});
const save = () => {
  updateIndex();
  uni.showToast({
    title: "保存成功",
    icon: "success",
  });
  uni.navigateBack();
};
</script>

<style scoped lang="scss"></style>
