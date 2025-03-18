import { defineStore } from "pinia";
import { Message, UserPlan } from "@/types/chat";
import { ref } from "vue";
import { avatarList as AvatarList, defaultAvatar, wsURL } from "@/settings";
import { ws } from "@/utils";
import pinia, { useUserStore } from "@/stores";
import { GetTime } from "@/utils";
import { useAudioStop } from "@/hooks/useAudio";
import { appearanceList as List, defaultAppearance } from "@/settings";

const userStore = useUserStore(pinia);
export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<Message[]>([]);
  const isTyping = ref(false);
  const isStop = ref(false);
  const wsInstance = ref<ws<Message>>();
  const isMute = ref(false);
  const appearanceList = ref(List);
  const appearanceIndex = ref(defaultAppearance);
  const avatarList = ref(AvatarList);
  const avatarIndex = ref(defaultAvatar);
  const submitUserPlan = ref<UserPlan>();

  //TODO 持久化
  function init() {
    wsInstance.value = new ws<Message>(
      {
        url: `${wsURL}/${userStore.userProfile.token}`,
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
          if (
            chatList.value.length !== 0 &&
            message.id === chatList.value[chatList.value.length - 1].id
          ) {
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

  function wsClose() {
    wsInstance.value?.close({
      reason: "User Logout.",
    });
  }

  //TODO StopChat
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

  function changeAppearance(index: number) {
    appearanceIndex.value = index;
  }

  function changeAvatar(index: number) {
    avatarIndex.value = index;
  }

  return {
    sendText,
    isMute,
    isTyping,
    appearanceIndex,
    chatList,
    isStop,
    appearanceList,
    stopChat,
    wsClose,
    newChat,
    changeAppearance,
    avatarList,
    avatarIndex,
    changeAvatar,
    submitUserPlan,
  };
});
