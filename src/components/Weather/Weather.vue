<template>
  <view class="flex justify-center items-center">
    <view class="-mr-6 icon-bg rounded-full inline-block p-2 z-30">
      <image
        :src="GetWeatherIconUrl(icon, 'line', 'black', 100)"
        style="width: 1.5rem; height: 1.5rem"
      />
    </view>
    <view
      class="bg-[#000000] rounded-full flex justify-center items-center text-white p-1 pl-8 pr-3 relative opacity-50"
    >
      <view class="font-bold mr-2">
        {{ cityName }}
      </view>
      <view>{{ temp }}°C</view>
    </view>
  </view>
</template>

<script setup lang="ts" name="Weather">
import { useWeatherData } from "@/hooks";
import { onMounted } from "vue";
import { ref } from "vue";
import { CityType, WeatherType } from "@/types/weather";
import { useCheckStore } from "@/stores";
import { GetWeatherIconUrl } from "@/settings";

const city = ref<CityType>();
const weather = ref<WeatherType>();
const cityName = ref<string>("");
const weatherData = ref<string>("");
const temp = ref<string>("");
const icon = ref<string>("");
const checkStore = useCheckStore();
onMounted(async () => {
  const res = await useWeatherData();
  city.value = res.city;
  weather.value = res.weather;
  cityName.value = res.cityName;
  weatherData.value = res.weatherData;
  temp.value = res.temp;
  try {
    checkStore.temp = Number(res.temp);
  } catch {
    checkStore.temp = 0;
  }
  icon.value = res.icon;
  console.log(res);
});
</script>

<style scoped lang="scss">
.icon-bg {
  backdrop-filter: blur(10px) !important;
  background-color: rgb(255 255 255 / 0.5) !important;
}
</style>
