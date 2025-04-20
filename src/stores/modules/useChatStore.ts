import { defineStore } from "pinia";
import { Message, UserPlan } from "@/types/chat";
import { ref, watch } from "vue";
import {
  avatarList as AvatarList,
  defaultAvatar,
  VOICE_BUFFER_LEN,
  wsURL,
} from "@/settings";
import { ws } from "@/utils";
import pinia, { useUserStore } from "@/stores";
import { GetTime } from "@/utils";
import { Audio } from "@/hooks/useAudio";
import {
  appearanceList as List,
  defaultAppearance,
  CHAT_TIME_OUT,
  CHAT_STOP_MSG,
  CHAT_LEAVE_MSG,
} from "@/settings";
import { reqTextToVoice } from "@/api/modules/recorderAPI";

const userStore = useUserStore(pinia);
export const useChatStore = defineStore("chatStore", () => {
  const chatList = ref<Message[]>([]);
  const isTyping = ref(false);
  const isStop = ref(false);
  const wsInstance = ref<ws<Message>>();
  const audioInstance = ref<Audio>();
  const isMute = ref(false);
  const appearanceList = ref(List);
  const appearanceIndex = ref(defaultAppearance);
  const avatarList = ref(AvatarList);
  const avatarIndex = ref(defaultAvatar);
  const submitUserPlan = ref<UserPlan>();
  const Timer = ref<ReturnType<typeof setTimeout>>();

  //超时处理
  const useEffect = () => {
    if (Timer.value) {
      clearTimeout(Timer.value);
    }
    Timer.value = setTimeout(async () => {
      chatList.value.push({
        id: Date.now(),
        content: "响应超时，请重试",
        type: "system",
        time: GetTime(),
        polyline: {
          isPolyline: false,
          polyline: [],
        },
        hasSlice: false,
      });
      console.log("超时处理", isStop.value);
      //如果isStop为true，则说明是停止超时，不需要再发一下停止消息
      if (!isStop.value) await stopChat();
      else audioInstance.value?.StopAudio();
      isTyping.value = false;
      isStop.value = false;
    }, CHAT_TIME_OUT);
  };

  //TODO 持久化
  function init() {
    if (!userStore.userProfile.token || userStore.userProfile.token === "") {
      uni.showToast({
        title: "登录后再使用吧~",
        icon: "none",
      });
      return;
    }
    if (wsInstance.value && wsInstance.value.ready) {
      return;
    }
    wsInstance.value = new ws<Message>(
      {
        url: `${wsURL}/${userStore.userProfile.token}`,
        method: "GET",
      },
      "Chat",
      (_) => {},
      ({ data: message }) => {
        if (!isStop.value) {
          isTyping.value = true;
        }
        //刷新计时器
        useEffect();
        if (!message.hasSlice) {
          //无分片
          //如果不为空，则说明要么是尾消息或者无分片的单条消息
          if (message.content !== "") {
            chatList.value.push(message);
          } else {
            //内容为空的话就是标志信息
            //1.路线的标志信息
            if (message.polyline.isPolyline) {
              chatList.value.push(message);
            } else {
              //2.所有消息的终止消息，且是被动结束，不用考虑后面是否还有消息
              clearTimeout(Timer.value);
              isTyping.value = false;
              if (isStop.value) {
                isStop.value = false;
              }
            }
          }
        } else {
          //有分片，则说明有分片消息，是有效信息
          if (
            // 如果不是首条信息（确保前一条消息存在）并且和前一条id相同
            chatList.value.length !== 0 &&
            message.id === chatList.value[chatList.value.length - 1].id
          ) {
            //合并内容
            chatList.value[chatList.value.length - 1].content +=
              message.content;
            //如果有路线，提取路线
            if (message.polyline.isPolyline)
              chatList.value[chatList.value.length - 1].polyline =
                message.polyline;
          } else {
            //首条消息或和前一条id不相同，说明为新消息，直接添加新消息
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

  function initAudio() {
    if (!audioInstance.value || audioInstance.value.IsValidated())
      audioInstance.value = new Audio();
  }

  initAudio();
  const temp = ref("");
  const rest = ref("");
  watch(
    [
      () => chatList.value.length,
      () => {
        if (chatList.value.length > 0)
          return chatList.value[chatList.value.length - 1].content.length;
        else return undefined;
      },
    ],
    async () => {
      if (chatList.value.length === 0) return;
      if (
        chatList.value[chatList.value.length - 1].type === "assistant" &&
        chatList.value[chatList.value.length - 1].content
      ) {
        const buffer = chatList.value[
          chatList.value.length - 1
        ].content.replace(temp.value, "");
        rest.value = buffer;
        if (buffer.length > VOICE_BUFFER_LEN) {
          temp.value = chatList.value[chatList.value.length - 1].content;
          reqTextToVoice(buffer).then((path) => {
            if (audioInstance.value) {
              audioInstance.value.AddAudio(path);
            }
          });
        }
      }
    }
  );
  watch(isTyping, (newVal) => {
    if (!newVal) {
      if (rest.value) {
        reqTextToVoice(rest.value).then((path) => {
          if (audioInstance.value) {
            audioInstance.value.AddAudio(path);
          }
          rest.value = "";
        });
      }
    }
  });

  //新聊天 出错会重启，会清空消息
  function newChat() {
    stopChat().finally(() => {
      chatList.value = [];
      wsInstance.value?.close({
        reason: "New Chat.",
      });
      init();
    });
  }

  //发送离开信息 出错不会重启，不会清空消息
  function wsClose() {
    stopChat(CHAT_LEAVE_MSG).finally(() => {
      wsInstance.value?.close({
        reason: "User Logout.",
      });
    });
  }

  //发送停止消息 出错会重启，不会清空消息
  async function stopChat(content?: string) {
    try {
      await sendText({
        id: Date.now(),
        content: content || CHAT_STOP_MSG,
        type: "system",
        time: GetTime(),
        polyline: {
          isPolyline: false,
          polyline: [],
        },
        hasSlice: false,
      });
    } catch {
      /*empty*/
    } finally {
      audioInstance.value && audioInstance.value.StopAudio();
      isTyping.value = false;
      isStop.value = true;
    }
  }

  function sendText(chat: Message, success?: () => void, fail?: () => void) {
    if (!wsInstance.value || !wsInstance.value.ready) {
      if (chat.content !== CHAT_STOP_MSG && chat.content !== CHAT_LEAVE_MSG) {
        uni.showToast({
          title: "网络错误，重连中",
          icon: "none",
        });
      }
      if (chat.content !== CHAT_LEAVE_MSG) {
        init();
        fail && fail();
      } else success && success();
    } else {
      if (isTyping.value) {
        return uni.showToast({
          title: "请稍后，正在生成",
          icon: "none",
        });
      }
      if (isStop.value) {
        return uni.showToast({
          title: "请稍后，正在停止",
          icon: "none",
        });
      }
      //如果是用户输入，由于必须要有回应，所以使用计时器
      if (chat.type === "user") useEffect();
      wsInstance.value.sendMessage({
        data: JSON.stringify(chat),
        success(_) {
          if (
            chat.type !== "system" ||
            (chat.content !== CHAT_STOP_MSG && chat.content !== CHAT_LEAVE_MSG)
          )
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
    init,
    audioInstance,
  };
});
