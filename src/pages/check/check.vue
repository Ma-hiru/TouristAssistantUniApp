<template>
  <view
    class="w-screen h-screen overflow-hidden check-box grid grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)]"
  >
    <view class="w-screen mt-8" :style="{ height: menuButtonTop + 'px' }" />
    <view class="w-screen flex flex-col items-start justify-center min-h-52">
      <view class="flex justify-start items-start w-full">
        <view class="text-box">
          <view class="post-text text-xl z-50" @tap="CheckYIYAN">
            {{ YIYAN }}
          </view>
        </view>
      </view>
      <view class="flex flex-col items-center justify-center mb-8 ml-4">
        <view class="flex flex-col justify-center items-center">
          <text class="font-bold text-xl text-yellow-200">{{ date }}</text>
          <text class="text-white text-xs">Date</text>
        </view>
        <view class="flex flex-col justify-center items-center">
          <view class="font-bold text-xl text-yellow-200 relative">
            <text>{{ temp }}</text>
            <text class="text-xs absolute top-0 -right-3">℃</text>
          </view>
          <text class="text-white text-xs">Temp</text>
        </view>
      </view>
    </view>
    <view class="bg-gray-200 rounded-t-2xl overflow-hidden">
      <CheckShare :yiyan="YIYAN" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import CheckShare from "@/components/CheckShare/CheckShare.vue";
import { reqGetYIYAN } from "@/api";
import { CharsetYIYAN, EncodeYIYAN, TypeYIYAN } from "@/types/card.d";
import { DetailYIYANURL, ModelYIYAN } from "@/settings";
import { useWeatherData } from "@/hooks";

const date = ref(new Date().getDate());
const temp = ref(0);
const menuButtonTop = computed(() => {
  const top = uni.getMenuButtonBoundingClientRect().top;
  if (top === 0) return 20;
  return top;
});
const YIYAN = ref("");
const DetailYIYAN = ref(DetailYIYANURL);
const UuidYIYAN = ref("");
const GetYIYAN = async () => {
  const res = await reqGetYIYAN(ModelYIYAN);
  YIYAN.value = res.result.hitokoto;
  DetailYIYAN.value += res.result.uuid;
  UuidYIYAN.value = res.result.uuid;
};
const CheckYIYAN = () => {
  console.log("1");
  uni.navigateTo({
    url: `/pages_sub/default/pages/yiyan/yiyan?uuid=${UuidYIYAN.value}`,
  });
};
onMounted(async () => {
  await GetYIYAN();
  useWeatherData().then((res) => {
    temp.value = Number(res.temp);
  });
});
</script>

<style scoped lang="scss">
.check-box {
  background-image: $check-bg-url;
  background-repeat: no-repeat;
  background-position: 0 0;
  -webkit-background-size: cover;
  background-size: cover;
}

.text-box {
  width: 14rem;
  padding-left: 1rem;
  padding-bottom: 1.5rem;

  .post-text {
    background: linear-gradient(to right, rgba(255, 255, 3, 0.84), white);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: right;
    font-weight: 900;
  }
}
</style>
