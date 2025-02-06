<template>
  <view
    class="absolute bottom-0 w-full"
    :style="{
      // bottom: `${currentY}px`,
      transform: `translateY(${-currentY}px)`,
      transition: 'transform 0.2s ease',
    }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- 内容区域 -->
    <view class="bg-white p-2 rounded-l-xl rounded-r-xl shadow-xl">
      <!-- 抽屉把手 -->
      <view
        class="w-28 h-1 bg-[#666] rounded-[4rpx] ml-auto mr-auto relative -top-4 opacity-50"
      />
      <!-- 卡片内容 -->
      <view
        class="p-2 grid grid-rows-[auto_1fr_auto]"
        :style="{ height: props.height }"
      >
        <view class="mb-1">
          <uni-easyinput
            confirm-type="search"
            prefixIcon="search"
            placeholder="搜索地点"
            :adjust-position="false"
            @focus="up"
          />
        </view>
        <view class="flex justify-center items-center">
          <text>暂无历史记录</text>
        </view>
        <view class="h-24" />
      </view>
    </view>
  </view>
  <view class="fixed bottom-0 pb-4 flex w-full justify-around bg-white">
    <view class="flex items-center flex-col" @tap="goToRoute('point')">
      <button class="clear-btn">
        <image
          src="/static/map/positions.svg"
          style="height: 2rem; width: 2rem"
        />
      </button>
      <text class="mt-2">地点总览</text>
    </view>
    <view class="flex items-center flex-col" @tap="goToRoute('chat')">
      <button class="clear-btn">
        <image src="/static/map/flag.svg" style="height: 2rem; width: 2rem" />
      </button>
      <text class="mt-2">AI规划路线</text>
    </view>
    <view class="flex items-center flex-col" @tap="goToRoute('share')">
      <button class="clear-btn">
        <image src="/static/map/share.svg" style="height: 2rem; width: 2rem" />
      </button>
      <text class="mt-2">路线分享</text>
    </view>
  </view>
</template>

<script setup lang="ts" name="IndexBar">
import { ref, onMounted } from "vue";
import { TouchEvent } from "@uni-helper/uni-app-types";

const goToRoute = async (path: "chat" | "point" | "share") => {
  if (path === "chat")
    await uni.switchTab({
      url: `/pages/${path}/${path}`,
    });
  else
    await uni.navigateTo({
      url: `/pages/${path}/${path}`,
    });
};
/** 动画部分 */
const props = defineProps<{
  positions: {
    closed: number;
    opened: number;
    threshold: number;
    delta: number;
  };
  height: `${string}rem` | `${number}px`;
}>();
const currentY = ref(0);
const startY = ref(0);
let deltaY = 0;
onMounted(() => {
  currentY.value = props.positions.closed;
});
const handleTouchStart = (e: unknown) => {
  startY.value = (e as TouchEvent).touches[0].clientY!;
};
const handleTouchMove = (e: unknown) => {
  deltaY = startY.value - (e as TouchEvent).touches[0].clientY!;
  let newY = currentY.value + deltaY;
  newY = Math.min(
    props.positions.opened,
    Math.max(props.positions.closed, newY)
  );
  currentY.value = newY;
  startY.value = (e as TouchEvent).touches[0].clientY!;
};
const handleTouchEnd = () => {
  if (
    currentY.value < props.positions.threshold &&
    currentY.value - props.positions.closed > props.positions.delta
  )
    up();
  else if (
    currentY.value > props.positions.threshold &&
    currentY.value - props.positions.opened < -props.positions.delta
  )
    down();
  else currentY.value > props.positions.threshold ? up() : down();
};

function up() {
  currentY.value = props.positions.opened;
}

function down() {
  currentY.value = props.positions.closed;
}

defineExpose({ up, down });
</script>

<style scoped lang="scss">
.clear-btn {
  background-color: transparent;
  border: none;
}

.clear-btn::after {
  border: none;
}
</style>
