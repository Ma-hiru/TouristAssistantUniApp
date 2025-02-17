import { defineStore } from "pinia";
import { Message } from "@/types/chat";
import { ref } from "vue";
import { wsURL } from "@/api";
import { ws } from "@/utils";
import pinia, { useUserStore } from "@/stores";
import { GetTime } from "@/utils";
import { useAudioStop } from "@/hooks/useAudio";
import { appearanceList as List, defaultAppearance } from "@/settings";

const userStore = useUserStore(pinia);
export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<Message[]>([]);
  const isTyping = ref(false);
  // const typingWhere = ref(0);
  const isStop = ref(false);
  const wsInstance = ref<ws<Message>>();
  const isMute = ref(false);
  const appearanceList = ref(List);
  const appearanceIndex = ref(defaultAppearance);

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
    useAudioStop();
    isStop.value = true;
    isTyping.value = false;
    chatList.value = [];
  }

  function getChatList() {}

  function stopChat() {
    // sendText({
    //   id: 114,
    //   content: "stop",
    //   type: "system",
    //   time: GetTime(),
    //   polyline: {
    //     isPolyline: false,
    //     polyline: [],
    //   },
    //   hasSlice: false,
    // });
  }

  function sendText(chat: Message, success?: () => void, fail?: () => void) {
    chatList.value.push(chat);
    chatList.value.push({
      type: "assistant",
      content: "hello",
      id: 114,
      hasSlice: false,
      time: GetTime(),
      polyline: {
        isPolyline: false,
        polyline: [],
      },
    });
    success && success();
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

  function changeAppearance() {
    appearanceIndex.value =
      ++appearanceIndex.value % appearanceList.value.length;
  }
  return {
    sendText,
    isMute,
    getChatList,
    // typingWhere,
    isTyping,
    appearanceIndex,
    chatList,
    // typeComplete,
    isStop,
    appearanceList,
    stopChat,
    newChat,
    changeAppearance,
  };
});
