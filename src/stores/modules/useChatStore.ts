import { defineStore } from "pinia";
import { Chat, ChatList } from "@/types/chat";
import { ref } from "vue";
import data from "./data.txt?raw";

export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<ChatList>([]);
  const isTyping = ref(false);
  const typingWhere = ref(0);
  const isStop = ref(false);
  const loginInfo = ref({
    nickname: "",
    avatar: "",
    code: "",
  });
  //TODO createWs
  //TODO 持久化
  (function init() {})();
  function newChat() {
    isStop.value = true;
    setTimeout(() => {
      chatList.value = [];
      isTyping.value = false;
      typingWhere.value = 0;
      isStop.value = false;
    }, 300);
  }
  function typeComplete() {
    if (typingWhere.value === 0) return;
    chatList.value[chatList.value.length - 1].isAdd = false;
    chatList.value[chatList.value.length - 1].content = chatList.value[
      chatList.value.length - 1
    ].content.slice(0, typingWhere.value);
    typingWhere.value = 0;
  }

  function getChatList() {}

  function sendText(chat: Chat, callback?: () => void) {
    chatList.value.push(chat);
    chatList.value.push({
      id: Math.floor(100 * Math.random()),
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
    loginInfo,
    sendText,
    sendImage,
    getChatList,
    typingWhere,
    isTyping,
    chatList,
    typeComplete,
    isStop,
    newChat,
  };
});
