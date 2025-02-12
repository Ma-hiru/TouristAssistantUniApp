import { defineStore } from "pinia";
import { Message } from "@/types/chat";
import { ref } from "vue";
import { ws, wsURL } from "@/api";
import pinia, { useUserStore } from "@/stores";
import { GetTime } from "@/utils";

const userStore = useUserStore(pinia);
export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<Message[]>([]);
  const isTyping = ref(false);
  // const typingWhere = ref(0);
  const isStop = ref(false);
  const wsInstance = ref<ws<Message>>();

  //TODO 持久化
  function init() {
    wsInstance.value = new ws<Message>(
      {
        url: `${wsURL}?token=${userStore.userProfile.token}`,
        method: "GET",
      },
      "Chat",
      (_) => {},
      ({ data: message }) => {
        if (!message.hasSlice) {
          chatList.value.push(message);
          isTyping.value = false;
        } else {
          isTyping.value = true;
          if (message.id === chatList.value[chatList.value.length - 1].id) {
            chatList.value[chatList.value.length - 1].content +=
              message.content;
          } else {
            chatList.value.push(message);
          }
        }
      },
      () => {},
      () => {
        uni
          .showToast({
            title: "网络错误",
            icon: "none",
          })
          .then();
      }
    );
  }

  init();

  function newChat() {
    isStop.value = true;
    setTimeout(() => {
      chatList.value = [];
      isTyping.value = false;
      isStop.value = false;
    }, 300);
  }

  function getChatList() {}

  function stopChat() {
    sendText({
      id: 114,
      content: "stop",
      type: "system",
      time: GetTime(),
      polyline: {
        isPolyline: false,
        polyline: [],
      },
      hasSlice: false,
    });
  }
  function sendText(chat: Message, success?: () => void, fail?: () => void) {
    if (!wsInstance.value || !wsInstance.value.ready) {
      uni
        .showToast({
          title: "网络错误，重连中",
          icon: "none",
        })
        .then();
      init();
      fail && fail();
    } else {
      wsInstance.value.sendMessage({
        data: JSON.stringify(chat),
        success(_) {
          chatList.value.push(chat);
          isTyping.value = true;
          success && success();
        },
        fail(_) {
          uni
            .showToast({
              title: "网络错误",
              icon: "none",
            })
            .then();
          fail && fail();
        },
      });
    }
  }

  return {
    sendText,
    getChatList,
    // typingWhere,
    isTyping,
    chatList,
    // typeComplete,
    isStop,
    stopChat,
    newChat,
  };
});
