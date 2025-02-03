import { defineStore } from "pinia";
import { Chat, ChatList } from "@/types/chat";
import { ref } from "vue";
import data from "./data.txt?raw";

export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<ChatList>([]);
  //TODO createWs
  (function init() {})();

  function getChatList() {}

  function sendText(chat: Chat, callback?: () => void) {
    chatList.value.push(chat);
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
