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
      title: "武当山",
      position: {
        latitude: 116.4,
        longitude: 39.9,
      },
      iconPath: "",
      detail: {
        content:
          "中国道教圣地，又名太和山、谢罗山、参上山、仙室山，古有“太岳”、“玄岳”、“大岳”之称。2010至2013年，武当山分别被评为国家AAAAA级旅游风景区、国家森林公园、中国十大避暑名山、海峡两岸交流基地，入选最美 “国家地质公园”。",
        position: "湖北省十堰市丹江口市武当山特区永乐路14号‌",
        cover: "https://shiina-mahiru.cn/download/wudangshan.jpg",
        tel: "123456789",
        time: "08：00—17：00",
        price: "164元/天",
      },
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
        latitude: point.position.latitude,
        longitude: point.position.longitude,
        iconPath: point?.iconPath ?? "",
        width: 20,
        height: 20,
        title: point.title,
        callout: {
          content: point.detail.content,
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
