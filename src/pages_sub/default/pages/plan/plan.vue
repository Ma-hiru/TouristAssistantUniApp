<template>
  <view
    class="w-screen h-screen bg-gray-50 pl-6 pr-6 contain-layout pb-[6.5rem] overflow-y-scroll"
  >
    <PlanCard title="游览时长" sub-title="请选择你的">
      <template #default>
        <view class="flex justify-between items-center">
          <button
            class="clear-btn text-base font-bold p-1 leading-4"
            v-for="item in PlanTime"
            :key="item.val"
            @tap="selectedTime = item.val"
            :style="selectedTime === item.val && styles.selectedColor"
          >
            {{ item.val }} <br />
            min
          </button>
        </view>
      </template>
    </PlanCard>
    <PlanCard title="游览方式" sub-title="请选择你的">
      <template #default>
        <view class="flex items-center justify-between">
          <button
            class="clear-btn text-base font-bold p-1 leading-4 flex flex-col justify-center items-center"
            v-for="(item, index) in goOutType"
            :key="item.name"
            @tap="selectType = item.name"
          >
            <image
              :src="
                selectType === item.name
                  ? iconsPath[index]?.select
                  : iconsPath[index]?.icon
              "
              style="width: 2rem; height: 2rem"
            />
            <text class="mt-2">{{ item.name }}</text>
          </button>
        </view>
      </template>
    </PlanCard>
    <PlanCard title="旅游偏好" sub-title="请选择你的">
      <template #default>
        <view>
          <scroll-view
            class="whitespace-nowrap w-full"
            :scroll-x="true"
            :show-scrollbar="false"
          >
            <view
              class="inline-block"
              v-for="(item, index) in sightseeingType"
              :key="item.name"
              :style="index !== 0 && { marginLeft: '1.5rem' }"
            >
              <button
                class="clear-btn text-base font-bold p-1 leading-4 flex flex-col justify-center items-center"
                @tap="selectedSightseeingType = item.name"
              >
                <image
                  :src="
                    selectedSightseeingType === item.name
                      ? sightseeIconPath[index].select
                      : sightseeIconPath[index].icon
                  "
                  style="width: 2rem; height: 2rem"
                />
                <text class="mt-2">{{ item.name }}</text>
              </button>
            </view>
          </scroll-view>
        </view>
      </template>
    </PlanCard>
    <PlanCard title="经过的地点" sub-title="请选择你想要">
      <template #default>
        <view>
          <uni-easyinput
            prefix-icon="search"
            confirm-type="search"
            v-model="searchKeywords"
            placeholder="搜索地点"
            :adjust-position="false"
          />
          <scroll-view
            :show-scrollbar="false"
            class="whitespace-nowrap w-full mt-4"
            :scroll-x="true"
          >
            <view
              class="p-4 inline-block"
              v-for="item in pointList"
              :key="item.id"
            >
              <button
                @tap="selectedPoint = item"
                class="p-1 clear-btn flex justify-center items-center flex-col"
                :style="selectedPoint?.id === item.id && styles.selectedBorder"
              >
                <image
                  :src="item.cover"
                  style="width: 2rem; height: 2rem"
                  mode="aspectFill"
                />
                <text
                  class="mt-2 max-w-16"
                  :class="{ 'scroll-text': item.title.length > 4 }"
                >
                  {{ item.title }}
                </text>
              </button>
            </view>
            <view
              v-show="pointList.length === 0"
              class="flex justify-center items-center p-10"
            >
              未找到地点！
            </view>
          </scroll-view>
        </view>
      </template>
    </PlanCard>
    <view class="mt-2 flex justify-center items-center">
      您当前的位置是：
      <text
        class="underline text-[--diy-color-primary]"
        @tap="currentPoint?.title && (searchKeywords = currentPoint.title)"
      >
        {{ currentPoint?.title ?? "暂无数据" }}
      </text>
    </view>
  </view>
  <view
    class="fixed left-0 flex flex-col justify-center items-center w-screen p-12 pt-0 pb-4 bg-gray-50"
    :style="{ bottom: `${safeAreaInsets.bottom}px` }"
  >
    <view class="w-full flex justify-center">
      <button class="clear-btn mb-4 text-[#333] underline" @tap="goToChat">
        不清楚需求？问问小D吧！
      </button>
    </view>
    <button
      class="w-full p-3 bg-[--diy-color-primary] clear-btn rounded-lg text-white"
      hover-class="btn-hover"
      @tap="submit"
    >
      一键生成
    </button>
  </view>
</template>

<script setup lang="ts">
import {
  defaultGoOutType,
  defaultSightseeingype,
  defaultTime,
  goOutType,
  PlanTime,
  sightseeingType,
} from "@/settings";
import PlanCard from "@/pages_sub/default/components/PlanCard.vue";
import { computed, onMounted, ref } from "vue";
import { useMapStore } from "@/stores";
import { Point } from "@/types/map";
import { useLocation } from "@/hooks";
import { reqGetNearByPoints, reqGetPointDetail } from "@/api/modules/mapAPI";
import { useChatStore } from "@/stores/modules/useChatStore";
import { UserPlan } from "@/types/chat";

const mapStore = useMapStore();
const chatStore = useChatStore();
const { safeAreaInsets } = uni.getWindowInfo();
const searchKeywords = ref("");
const pointList = computed(() =>
  mapStore.pointList.filter((item) => item.title.includes(searchKeywords.value))
);
const selectType = ref<string>(defaultGoOutType.name);
const selectedTime = ref<number>(defaultTime.val);
const selectedSightseeingType = ref<string>(defaultSightseeingype.name);
const selectedPoint = ref<Point>();
const styles = {
  selectedColor: {
    color: "#0066d5",
  },
  selectedBorder: {
    border: "2px solid #0066d5",
  },
};

interface IconPath {
  icon: string;
  select: string;
}

const iconsPath = ref<Array<IconPath>>([]);
const sightseeIconPath = ref<Array<IconPath>>([]);
onMounted(() => {
  goOutType.forEach(async (item) => {
    const path = await item.icon();
    const select = await item.select();
    iconsPath.value.push({
      icon: path.default,
      select: select.default,
    });
  });
  sightseeingType.forEach(async (item) => {
    const path = await item.icon();
    const select = await item.select();
    sightseeIconPath.value.push({
      icon: path.default,
      select: select.default,
    });
  });
});
const goToChat = () => {
  uni.switchTab({ url: "/pages/chat/chat" });
};
const currentPoint = ref<Point>();
const findPoint = async () => {
  try {
    const res = await useLocation();
    const pointsIdList = await reqGetNearByPoints(res);
    const data = await reqGetPointDetail(pointsIdList.result[0]);
    currentPoint.value = data.result;
  } catch {
    /*empty*/
  }
};
const submit = () => {
  if (!selectedPoint.value) {
    return uni.showToast({
      title: "请选择地点！",
      icon: "none",
    });
  }
  chatStore.submitUserPlan = {
    selectedTime: selectedTime.value,
    selectType: selectType.value,
    selectedPoint: selectedPoint.value,
    selectedSightseeingType: selectedSightseeingType.value,
  } as UserPlan;
  uni.switchTab({ url: "/pages/chat/chat" });
};
onMounted(() => {
  findPoint();
});
</script>

<style scoped lang="scss">
scroll-view ::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

.scroll-text {
  animation: scroll-text 5s 0s linear infinite;
}

@keyframes scroll-text {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-250%);
  }
}
</style>
