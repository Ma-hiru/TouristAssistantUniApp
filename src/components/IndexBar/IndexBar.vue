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
            v-model="searchText"
            confirm-type="search"
            prefixIcon="search"
            placeholder="搜索地点和公共服务"
            :adjust-position="false"
            @focus="up"
          />
        </view>
        <view
          class="flex flex-col items-center w-full overflow-hidden"
          :style="{
            justifyContent: !searchText ? 'center' : 'start',
          }"
        >
          <text v-show="!searchText">搜索并浏览地点吧！</text>
          <view class="w-full overflow-y-scroll">
            <uni-list v-show="searchText" style="width: calc(100%)">
              <uni-list-chat
                v-for="(point, index) in pointList"
                :key="point.id"
                :clickable="true"
                :title="point.title"
                link
                @click="handleTapList(point.id, index)"
                :avatar="point.detail.cover"
                :note="point.detail.content"
                badge-positon="left"
              >
                <view class="chat-custom-right">
                  <text class="chat-custom-text">打卡点</text>
                  <uni-icons type="star-filled" color="#999" size="18" />
                </view>
              </uni-list-chat>
            </uni-list>
          </view>
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
          style="height: 1.8rem; width: 1.8rem"
        />
      </button>
      <text class="mt-2 text-sm">地点总览</text>
    </view>
    <view class="flex items-center flex-col" @tap="goToRoute('chat')">
      <button class="clear-btn">
        <image
          src="/static/map/flag.svg"
          style="height: 1.8rem; width: 1.8rem"
        />
      </button>
      <text class="mt-2 text-sm">AI规划路线</text>
    </view>
  </view>
</template>

<script setup lang="ts" name="IndexBar">
import { ref, onMounted, computed } from "vue";
import { TouchEvent } from "@uni-helper/uni-app-types";
import { useMapStore } from "@/stores";

const searchText = ref("");
const mapStore = useMapStore();
const pointList = computed(() =>
  mapStore.pointList.filter((item) => {
    return searchText.value !== "" && item.title.includes(searchText.value);
  })
);
const handleTapList = (id: number, index: number) => {
  uni.navigateTo({
    url: `/pages_sub/default/pages/pointDetail/pointDetail?id=${id}&index=${index}`,
  });
};
const goToRoute = async (path: "chat" | "point" | "share") => {
  if (path === "chat")
    await uni.switchTab({
      url: `/pages/${path}/${path}`,
    });
  else
    await uni.navigateTo({
      url: `/pages_sub/default/pages/${path}/${path}`,
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
.chat-custom-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.chat-custom-text {
  font-size: 12px;
  color: #999;
}
</style>
