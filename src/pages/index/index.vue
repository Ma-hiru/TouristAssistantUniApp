<template>
  <view
    class="w-screen h-screen relative flex justify-end items-start flex-col"
  >
    <map
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
    <view class="z-20 mb-10 ml-4">
      <button
        class="floatBtn w-16 h-16 bg-blue-600 flex justify-center items-center rounded-full mb-4"
        hover-class="bg-blue-900"
        @tap="getLocation"
      >
        <ant-icon type="RedoOutline" style="font-size: 60rpx; color: white" />
      </button>
      <button
        class="floatBtn w-16 h-16 bg-blue-600 flex justify-center items-center rounded-full"
        hover-class="bg-blue-900"
        @tap="popupShow = true"
      >
        <ant-icon type="FlagOutline" style="font-size: 60rpx; color: white" />
      </button>
    </view>
    <view class="z-30">
      <wd-popup
        v-model="popupShow"
        custom-style="height: 80vh"
        @close="handleClose"
        position="bottom"
      >
        <view class="relative w-full h-full">
          <view class="text-center text-base font-bold p-4">
            <text>欢迎使用路线规划助手</text>
          </view>
          <view class="bg-gray-600 chatContent">Content</view>
          <ChatInput />
        </view>
      </wd-popup>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { Position } from "@/types/map";
import { MapMarker, MapPolyline } from "@uni-helper/uni-app-types";
import ChatInput from "@/components/ChatInput/index.vue";
//地图数据
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
    polyline.value[0].points[0].latitude = res.latitude;
    polyline.value[0].points[0].longitude = res.longitude;
    polyline.value[0].points[1].latitude = res.latitude + 0.001;
    polyline.value[0].points[1].longitude = res.longitude + 0.001;
    markers.value[0].latitude = res.latitude + 0.002;
    markers.value[0].longitude = res.longitude + 0.001;
  } catch (e) {
    console.log(e);
    await uni.showToast({
      title: "获取位置失败，请检查定位权限",
      icon: "none",
    });
  }
}

onLoad(async () => {
  await getLocation();
});
//悬浮按钮
//弹出层
const popupShow = ref(false);
const handleClose = () => {};
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

.chatContent {
  height: calc(80% - 1.5rem);
}
</style>
