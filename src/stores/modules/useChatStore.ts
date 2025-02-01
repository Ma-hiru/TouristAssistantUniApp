import { defineStore } from "pinia";
import { chat, chatList } from "@/types/chat";
import { ref } from "vue";
import data from "./data.txt?raw";

export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<chatList>([
    {
      id: undefined,
      userId: 1,
      content: "你好!",
      type: "user",
      time: "2023-05-05 12:00:00",
      isAdd: false,
    },
    {
      id: 2,
      userId: 1,
      content: "你好！",
      type: "assistant",
      time: "2023-05-05 12:00:00",
      isAdd: false,
    },
  ]);
  //TODO createWs
  (function init() {})();

  function getChatList() {}

  function sendText(chat: chat<"user">, callback?: () => void) {
    chatList.value.push(chat);
    console.log(data);
    chatList.value.push({
      id: 3,
      userId: 1,
      content: data,
      type: "assistant",
      time: "2023-05-05 12:00:00",
      isAdd: true,
    });
    callback && callback();
  }

  function sendImage() {}

  return {
    sendText,
    sendImage,
    getChatList,
    chatList,
  };
});
