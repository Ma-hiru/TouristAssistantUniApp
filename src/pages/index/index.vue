<template>
  <view
    class="w-screen h-screen relative flex justify-end items-end flex-col overflow-hidden"
  >
    <view
      class="absolute z-20 left-4"
      :style="{ top: safeAreaInsetsTop + 20 + 'px' }"
    >
      <Weather />
    </view>
    <map
      id="map"
      class="map"
      :polyline="mapStore.polyline"
      :markers="mapStore.markers"
      :show-location="true"
      :enable-traffic="true"
      :enable-3D="true"
      :enable-rotate="true"
      :skew="40"
      :show-compass="false"
      :controls="controls"
      :enable-poi="true"
      :scale="mapStore.scale"
      :enable-building="true"
      :enable-indoorMap="true"
      :longitude="mapStore.position.longitude"
      :latitude="mapStore.position.latitude"
      @callouttap="tapMarkerPop"
      @markertap="tapMarker"
    />
    <view class="z-20 mb-44 mr-4">
      <button
        class="w-12 h-12 bg-white flex justify-center items-center rounded-sm mb-4"
        @tap="mapStore.reset"
      >
        <image src="/static/map/reset.svg" style="height: 2rem; width: 2rem" />
      </button>
      <button
        class="w-12 h-12 bg-white flex justify-center items-center rounded-sm mb-4"
        @tap="mapStore.getLocation"
      >
        <image
          src="/static/map/location.svg"
          style="height: 2rem; width: 2rem"
        />
      </button>
    </view>
    <view class="w-full z-30 absolute bottom-0">
      <IndexBar :positions="bottomBarPositions" :height="bottomBarHeight" />
    </view>
  </view>
</template>
<script setup lang="ts">
import IndexBar from "@/components/IndexBar/IndexBar.vue";
import Weather from "@/components/Weather/Weather.vue";

import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import {
  MapControl,
  MapOnCallouttap,
  MapOnMarkertap,
} from "@uni-helper/uni-app-types";

/** 底部栏 */
import { rem } from "@/settings";
import { useMapStore } from "@/stores/modules/useMapStore";
import { reqGetAllPoints } from "@/api/modules/mapAPI";

const safeAreaInsetsTop = uni.getWindowInfo().safeAreaInsets?.top;
const bottomBarPositions = {
  closed: -28 * rem,
  opened: -2 * rem,
  threshold: -15 * rem,
  delta: 2 * rem,
};
const bottomBarHeight = "36rem";
/** 地图数据 */
const mapStore = useMapStore();
const controls = ref<MapControl[]>([
  {
    position: { left: 0, top: 0 },
    iconPath: "/static/map/location.svg",
  },
]);

const tapMarker: MapOnMarkertap = (event) => {
  console.log(event.detail.markerId);
};
const tapMarkerPop: MapOnCallouttap = (event) => {
  console.log(event.detail.markerId);
  uni.navigateTo({
    url: `/pages_sub/default/pages/pointDetail/pointDetail?id=${event.detail.markerId}`,
  });
};
const getPoint = async () => {
  //TODO 关闭错误提示
  try {
    // const res = await reqGetAllPoints();
    // mapStore.pointList = res.result;
  } catch {
    // await uni.showToast({
    //   title: "获取地点失败",
    //   icon: "none",
    // });
  }
};
onLoad(async () => {
  console.log("Map onLoad");
  mapStore.getMarkers();
  await mapStore.getLocation();
  await getPoint();
});
onShow(() => {
  console.log("Map onShow");
  if (mapStore.currentMarker) {
    console.log("移动到当前地点");
    console.log(mapStore.currentMarker);
    const mapContext = uni.createMapContext("map");
    mapContext.moveToLocation(mapStore.currentMarker);
    mapStore.currentMarker = undefined;
  }
});
</script>
<style lang="scss" scoped>
.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
}
</style>
