<template name="skeleton">
  <view class="w-screen grid grid-cols-[1fr_1fr] bg-gray-200">
    <view
      v-for="i in 10"
      :key="i"
      is="components/GuideCard/GuideCard"
      class="data-v-d4bc5906 data-v-d4bc5906"
    >
      <view
        class="m-1 GuideCard--m-1 flex GuideCard--flex rounded-lg GuideCard--rounded-lg bg-white GuideCard--bg-white flex-col GuideCard--flex-col justify-center GuideCard--justify-center items-center GuideCard--items-center p-1 GuideCard--p-1"
        style="margin-left: 0.25rem"
      >
        <view class="w-full GuideCard--w-full">
          <image
            class="rounded-lg GuideCard--rounded-lg sk-image"
            mode="widthFix"
            style="width: calc(100%); height: 115px"
          ></image>
        </view>
        <view
          class="pt-2 GuideCard--pt-2 pb-2 GuideCard--pb-2 sk-transparent sk-text-14-2857-975 sk-text"
        >
          paddingLeft: `${i % 2 === 0 ? 0 : 0.25}rem`
        </view>
        <view
          class="grid GuideCard--grid grid-rows-1 GuideCard--grid-rows-1 grid-cols--minmax-0-c-1fr-_auto- GuideCard--grid-cols--minmax-0-c-1fr-_auto- max_w-full GuideCard--max_w-full w-full GuideCard--w-full"
        >
          <view
            class="flex GuideCard--flex justify-start GuideCard--justify-start items-center GuideCard--items-center text-ellipsis GuideCard--text-ellipsis whitespace-nowrap GuideCard--whitespace-nowrap overflow-hidden GuideCard--overflow-hidden"
          >
            <view class="ant-avatar">
              <image
                class="ant-avatar-image ant-avatar-image-x-small sk-image"
              ></image>
            </view>
            <text
              class="ml-1 GuideCard--ml-1 text---h-666- GuideCard--text---h-666- text-ellipsis GuideCard--text-ellipsis whitespace-nowrap GuideCard--whitespace-nowrap text-sm GuideCard--text-sm sk-transparent sk-text-15-0000-961 sk-text"
              >八奈见杏菜
            </text>
          </view>
          <view
            class="flex GuideCard--flex justify-center GuideCard--justify-center items-center GuideCard--items-center w-10 GuideCard--w-10"
          >
            <view is="wxcomponents/antd-mini/Icon/index">
              <text
                class="ant-icon ant-icon-HeartOutline sk-pseudo sk-pseudo-circle"
              ></text>
            </view>
            <text class="sk-transparent sk-text-14-2857-281 sk-text">1k</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<style scoped lang="scss">
.sk-transparent {
  color: transparent !important;
}

.sk-text-16-6667-158 {
  background-image: linear-gradient(
    transparent 16.6667%,
    #eeeeee 0%,
    #eeeeee 83.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 41.8605rpx;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-14-2857-121 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-798 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-882 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-412 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-826 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-975 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-15-0000-961 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}

.sk-text-14-2857-281 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-938 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-15-0000-236 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}

.sk-text-14-2857-217 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-765 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-15-0000-50 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}

.sk-text-14-2857-510 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-601 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-15-0000-946 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}

.sk-text-14-2857-85 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-721 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-15-0000-915 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}

.sk-text-14-2857-608 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-14-2857-219 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-text-15-0000-478 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}

.sk-text-14-2857-650 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}

.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}

.sk-image {
  background: #efefef !important;
}

.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef none !important;
  color: transparent !important;
  border-color: transparent !important;
}

.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}

.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}

.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
<script setup lang="ts"></script>
