import { defineStore } from "pinia";
import { MapMarker, MapPolyline } from "@uni-helper/uni-app-types";
import { ref } from "vue";
import { PointList, Position } from "@/types/map";
import { mapScale } from "@/settings";

export const useMapStore = defineStore("mapStore", () => {
  const scale = ref<number>(mapScale);
  const markers = ref<MapMarker[]>([
    {
      id: 1,
      latitude: 28.336447,
      longitude: 113.00219,
      iconPath: "",
      width: 20,
      height: 20,
      title: "地点一",
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
  const position = ref<Position>({
    longitude: 116.4,
    latitude: 39.9,
  });
  const pointList = ref<PointList>([
    {
      id: 1,
      title: "武功山",
      latitude: 116.4,
      longitude: 39.9,
      iconPath: "",
      content:
        "又名罗霄山、泸潇山，位于江西省中西部，居罗霄山脉北支，山体呈东北—西南走向，地跨江西省萍乡市芦溪县、吉安市安福县、宜春市袁州区，主脉绵延120余千米，总面积约970平方千米。",
      position: "江西西部",
      cover:
        "https://shiina-mahiru.cn/sub/touristassistant/download/wugongshan.jpg",
      tel: "无",
      time: "无",
      price: "无",
    },
    {
      id: 2,
      title: "武功山风景名胜区",
      latitude: 116.4,
      longitude: 39.9,
      iconPath: "",
      content:
        "国家AAAAA级旅游景区，位于江西省中西部，萍乡、宜春、吉安三市交界处，地处湘赣边界的罗霄山脉北段，介于东经114°04’14”—114°22’52”和北纬27°22’36”—27°41’00”之间。",
      position: "江西省中西部，萍乡、宜春、吉安三市交界处",
      cover:
        "https://shiina-mahiru.cn/sub/touristassistant/download/wugongshanjq.png",
      tel: "12345678910",
      time: "4月1日-10月31日 08:10-16:40" + "11月1日-次年3月31日 08:20-16:00",
      price: "xxx元/天",
    },
  ]);
  const currentMarker = ref<Position>();

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
      markers.value[0].latitude = res.latitude + 0.001;
      markers.value[0].longitude = res.longitude + 0.001;
    } catch (e) {
      await uni.showToast({
        title: "获取位置失败，请检查定位权限",
        icon: "none",
      });
    }
  }

  function getMarkers() {
    markers.value = [];
    pointList.value.forEach((point) => {
      markers.value.push({
        id: point.id,
        latitude: point.latitude,
        longitude: point.longitude,
        iconPath: point?.iconPath ?? "",
        width: 20,
        height: 20,
        title: point.title,
        callout: {
          content: point.content,
          color: "#fff",
          fontSize: 12,
          borderRadius: 4,
          padding: 4,
          display: "ALWAYS",
          textAlign: "center",
          borderWidth: 1,
          borderColor: "#fff",
          bgColor: "#000",
        },
      });
    });
  }

  function getPoint() {}

  function reset() {
    if (polyline.value.length === 0) {
      uni
        .showToast({
          title: "暂无路线数据",
          icon: "none",
        })
        .then();
    } else {
      uni.showModal({
        title: "是否重置路线？",
        success: (res) => {
          res.confirm &&
            (polyline.value = []) &&
            uni
              .showToast({
                title: "重置路线成功",
                icon: "none",
              })
              .then();
        },
      });
    }
  }

  return {
    scale,
    markers,
    polyline,
    position,
    reset,
    getLocation,
    getMarkers,
    pointList,
    getPoint,
    currentMarker,
  };
});
