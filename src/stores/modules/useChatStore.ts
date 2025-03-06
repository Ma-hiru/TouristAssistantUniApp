import { defineStore } from "pinia";
import { Message } from "@/types/chat";
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

  function wsClose() {
    wsInstance.value?.close({
      reason: "User Logout.",
    });
  }

  //TODO StopChat
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
      content:
        "武功山的当地特色融合了自然奇观、人文底蕴和独特民俗，主要可从以下五方面概括：\n" +
        "\n" +
        "### 一、自然景观特色\n" +
        "1. **高山草甸奇观**  \n" +
        "   武功山拥有全球同纬度罕见的10万亩高山草甸，海拔1600米以上，四季色彩变幻：春绿如茵、夏翠欲滴、秋金灿灿、冬银装素裹，被誉为「天上草原」。云海翻涌时，草甸与天际相接，形成「履步彩云间」的诗意画面。\n" +
        "\n" +
        "2. **瀑布与天象奇景**  \n" +
        "   近200处形态各异的瀑布群，既有飞流直下的磅礴气势，也有逶迤潺潺的秀美姿态。日出日落尤为震撼，霞光普照草甸如燃烧，云海如诗如幻，被徐霞客赞为「观日景如金在冶」。\n" +
        "\n" +
        "3. **特殊地貌与温泉**  \n" +
        "   兼具岩溶、冰川地貌，山中暗河溶洞遍布寒武纪至三叠纪的石灰岩层。四季如春的温泉具有保健功效，规划中的人工湖建成后将形成60平方公里水域与奇山相映的景观。\n" +
        "\n" +
        "### 二、人文历史特色\n" +
        "1. **千年宗教遗迹**  \n" +
        "   自汉晋起为道佛圣地，现存「江南祭坛群」距今1700余年，四座无梁石砌祭坛按星相排列，是国内现存最早的古祭坛。明代建筑九龙十八塔群、白鹤观等30余处宗教遗址见证香火鼎盛。\n" +
        "\n" +
        "2. **红色文化印记**  \n" +
        "   第二次国内革命战争时期的「百里红色根据地」保存完整，万龙山烈士陵园、苏维埃政府旧址、游击小道等串联起农垦记忆与革命精神。\n" +
        "\n" +
        "### 三、民俗与非遗文化\n" +
        "1. **傩舞与灯彩**  \n" +
        "   武功山傩舞融合楚巫文化，面具以香樟木雕刻，分喜傩、福傩等类别，表演踩双刀、赵公耍剑等传统节目。缩龙灯彩以竹木扎制龙身，舞动时呈现「苍龙戏水」等动态场景，为省级非遗。\n" +
        "\n" +
        "2. **农俗体验**  \n" +
        "   保留古法造纸、舂米、牛灯等传统技艺，春锣、围鼓等民间音乐形式活跃于节庆。\n" +
        "\n" +
        "### 四、特色物产资源\n" +
        "1. **巨型活体灵芝**  \n" +
        "   大王庙景区有世界最大保存完好的活体灵芝，依附古树生长超百年，直径达1米。\n" +
        "\n" +
        "2. **珍稀动植物**  \n" +
        "   拥有成片银杏林（最大单株高24.5米）、千年桂花树及台湾松林，国家一级保护动物黄腹角雉、华南虎踪迹可寻。\n" +
        "\n" +
        "### 五、现代文旅活动\n" +
        "1. **户外运动品牌**  \n" +
        "   国际帐篷节规模居全国之首，吸引数万露营爱好者，曾登上《时代》周刊封面。结合自行车赛、越野赛等体育赛事，形成「南武功，北太白」的户外圈口碑。\n" +
        "\n" +
        "2. **节庆体验**  \n" +
        "   丰收节、音乐节等多元活动串联自然与文化资源，夜间登山观星等创新玩法成为社交媒体热门话题。\n" +
        "\n" +
        "---\n" +
        "**总结**：武功山的特色以「云中草原」为核心，融合地质奇观、千年宗教、红色记忆与非遗民俗，辅以巨型灵芝等独特物产，形成「自然+人文+体验」的多维吸引力。近期三市协同推进的「大武功山」开发，进一步整合了跨区域资源。",
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
  };
});
