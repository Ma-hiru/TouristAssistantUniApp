<template>
  <view class="w-screen h-screen bg-gray-200">
    <view class="bg-white w-screen top-0 left-0 z-[60] fixed">
      <view :style="{ height: `${menuButtonTop}px`, marginBottom: '2.5rem' }" />
    </view>
    <view
      class="fixed w-screen top-0 left-0 z-[70]"
      :style="{ paddingTop: `${menuButtonTop}px` }"
    >
      <view
        class="text-center relative text-base font-bold flex justify-center items-center"
      >
        打卡
      </view>
    </view>
    <view :style="{ height: `${menuButtonTop}px` }" class="mt-[4.5rem]" />
  </view>
</template>

<script setup lang="ts">
const { top: menuButtonTop } = uni.getMenuButtonBoundingClientRect();
</script>

<style scoped lang="scss"></style>
