<template>
  <view>
    <map
      class="map"
      :polyline="polyline"
      :markers="markers"
      :show-location="true"
      :show-compass="true"
      :longitude="position.longitude"
      :latitude="position.latitude"
    />
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const position = ref({
  latitude: 30.506244,
  longitude: 114.448641,
});
onLoad(async () => {
  const res = await uni.getLocation();
  position.value.latitude = res.latitude;
  position.value.longitude = res.longitude;
});
const markers = [
  {
    id: 1,
    latitude: 30.506244,
    longitude: 114.448641,
    title: "Test",
  },
];
const polyline = [
  {
    points: [
      {
        latitude: "30.506244",
        longitude: "114.448641",
      },
      {
        latitude: "30.503899",
        longitude: "114.443437",
      },
      {
        latitude: "30.502638",
        longitude: "114.440635",
      },
      {
        latitude: "30.499478",
        longitude: "114.435335",
      },
      {
        latitude: "30.50002",
        longitude: "114.423009",
      },
      {
        latitude: "30.479808",
        longitude: "114.420928",
      },
    ],
    color: "#FA6400",
    width: 10,
    arrowLine: true,
    borderWidth: 2,
  },
];
</script>
<style lang="scss">
.map {
  width: 100vw;
  height: 100vh;
}
</style>
