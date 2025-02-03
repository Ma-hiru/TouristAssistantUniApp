<template>
  <view>
    <ant-sender
      value="{{value1}}"
      placeholder="输入你想说的话..."
      bindchange="handleChange1"
      bindsubmit="handleSend1"
      bindcancel="handleCancel"
      loading="{{loading}}"
    />
  </view>
</template>

<script setup lang="ts" name="Input"></script>

<style scoped lang="scss"></style>
