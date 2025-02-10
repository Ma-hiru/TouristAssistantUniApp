<template>
  <view class="p-2 flex space-y-4 flex-col">
    <button :type="'warn'" class="p-2" @tap="handleClose">
      点击关闭ws连接
    </button>
    <view class="flex space-x-4 items-center">
      <button type="primary" class="p-2" @tap="handleOpen">
        点击打开ws连接
      </button>
      <input
        type="text"
        placeholder="输入连接"
        v-model="url"
        class="ml-4 border-gray-200 h-full border-1"
      />
    </view>
    <view class="flex space-x-4 items-center">
      <button type="default" class="p-2" @tap="handleSend">点击发送消息</button>
      <input
        type="text"
        placeholder="输入消息"
        v-model="sendText"
        class="ml-4 border-gray-200 h-full border-1"
      />
    </view>
    <view> 接收到：{{ msg }}</view>
  </view>
</template>

<script setup lang="ts" name="ws">
import { ws } from "@/api";
import { ref } from "vue";

let wsInstance: ws;
const msg = ref<any>();
const url = ref("ws://localhost:8080/ws");
const sendText = ref("");
const handleOpen = () => {
  wsInstance = new ws(
    {
      // http => ws   https => wss
      url: url.value,
      method: "GET",
    },
    "wsTest",
    (data) => {
      //onOpen
      console.log(data);
    },
    (data) => {
      //onClose
      console.log(data);
    },
    (data) => {
      //onError
      console.log(data);
    },
    (data) => {
      //onMessage
      msg.value = (msg.value + data.data) as any;
    }
  );
};
const handleClose = () => {
  wsInstance &&
    wsInstance.close({
      code: 1000,
      reason: "连接关闭",
    });
};
const handleSend = () => {
  wsInstance.sendMessage({
    data: JSON.stringify({
      id: 1,
      msg: sendText.value,
    }),
    fail(result) {
      console.log(result);
      wsInstance.close({
        /*
         * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
         */
        code: 1000,
        reason: "连接关闭",
      });
    },
  });
};
</script>

<style scoped lang="scss"></style>
