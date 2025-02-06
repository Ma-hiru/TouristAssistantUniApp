<template>
  <view
    class="w-screen h-screen relative flex justify-end items-end flex-col overflow-hidden"
  >
    <view
      class="absolute z-20 left-4"
      :style="{ top: safeAreaInsetsTop + 'px' }"
    >
      <Weather />
    </view>
    <map
      id="map"
      class="map"
      :polyline="polyline"
      :markers="markers"
      :show-location="true"
      :show-compass="false"
      :enable-poi="true"
      :scale="scale"
      :longitude="position.longitude"
      :latitude="position.latitude"
    />
    <view class="z-20 mb-44 mr-4">
      <button
        class="w-12 h-12 bg-white flex justify-center items-center rounded-sm mb-4"
        @tap="getLocation"
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
import { onLoad } from "@dcloudio/uni-app";
import { Position } from "@/types/map";
import { MapMarker, MapPolyline } from "@uni-helper/uni-app-types";

/** 底部栏 */
const safeAreaInsetsTop = uni.getWindowInfo().safeAreaInsets?.top;
import { rem } from "@/settings";

const bottomBarPositions = {
  closed: -28 * rem,
  opened: -2 * rem,
  threshold: -15 * rem,
  delta: 2 * rem,
};
const bottomBarHeight = "36rem";
/** 地图数据 */
const position = ref<Position>({
  longitude: 116.4,
  latitude: 39.9,
});
const scale = ref<number>(17);
const markers = ref<MapMarker[]>([
  {
    id: 1,
    latitude: 28.336447,
    longitude: 113.00219,
    iconPath: "",
    width: 20,
    height: 20,
    title: "Test",
  },
]);
const polyline = ref<MapPolyline[]>([
  {
    points: [
      {
        latitude: 30.506244,
        longitude: 114.448641,
      },
      {
        latitude: 30.503899,
        longitude: 114.443437,
      },
    ],
    color: "#FA6400",
    width: 10,
    arrowLine: true,
    borderWidth: 2,
  },
]);

async function getLocation() {
  try {
    const res = await uni.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
    });
    position.value.latitude = res.latitude;
    position.value.longitude = res.longitude;
    uni.createMapContext("map").moveToLocation(position.value);
    polyline.value[0].points[0].latitude = res.latitude;
    polyline.value[0].points[0].longitude = res.longitude;
    polyline.value[0].points[1].latitude = res.latitude + 0.001;
    polyline.value[0].points[1].longitude = res.longitude + 0.001;
    markers.value[0].latitude = res.latitude + 0.002;
    markers.value[0].longitude = res.longitude + 0.001;
  } catch (e) {
    await uni.showToast({
      title: "获取位置失败，请检查定位权限",
      icon: "none",
    });
  }
}

onLoad(async () => {
  await getLocation();
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
