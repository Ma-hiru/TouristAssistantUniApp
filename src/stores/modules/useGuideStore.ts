import { defineStore } from "pinia";
import { ref } from "vue";
import { CommentDetail, PostCategoryList, PostList } from "@/types/guide";

export const useGuideStore = defineStore("guideStore", () => {
  const createPostPoint = ref<{
    id: number;
    name: string;
  }>();
  const postList = ref<PostList>([
    {
      id: 2,
      title: "《我的阿勒泰》同款景点打卡路线来啦！！",
      content:
        "去见见李娟笔下的阿勒泰吧！\n" +
        "D1：各地-乌鲁木齐\n" +
        "D2：乌鲁木齐-S21沙漠公路-五彩滩日落-布尔津\n" +
        "D3：布尔津-禾木-禾木小木屋（晚上看星空）\n" +
        "D4：禾木-喀纳斯-铁贾公路-哈巴河县\n" +
        "D5：哈巴河-张凤霞小卖铺-巴太树-巡边-乌尔禾\n" +
        "D6：乌尔禾-自驾车魔鬼城-巅峰越野-乌鲁木齐\n" +
        "D7：乌鲁木齐送机\n" +
        "《我的阿勒泰》同款打卡景点：\n" +
        "喀纳斯：做为阿勒泰山的核心复地，喀纳斯宛如地球之眼，湖水清澈呈幽绿色，与茂密的森林雪山交相辉映\n" +
        "禾木村：穿梭在禾太村的小巷里，仿佛置身童话世界，每一栋木屋都透需着古朴的韵味\n" +
        "白哈巴村：称为“西北第一村”，在这里能看到绝美的夕阳，童话里的森林小木屋.\n" +
        "张凤侠的小卖部：门紧锁着，抹去窗玻璃表面厚厚的灰尘，可以清晰的看到里面还摆着几瓶饮料和零食\n" +
        "巴太树：巴太和文秀坐过的树，安静地赢立在离小实部往里几十米的地方，充满了故事～\n" +
        "五彩滩：上帝作画时遗离在人间的调色盘，一定要天气好的时候日落时分去看看，像极了一幅油画！",
      time: "2025-02-13",
      avatar: "https://shiina-mahiru.cn/project/download/avatar.jpg",
      nickname: "随身小D",
      cover: "https://shiina-mahiru.cn/project/download/wdalt.png",
      likes: 1200,
      position: {
        id: 1,
        name: "阿勒泰"
      },
      category: [
        {
          id: 1,
          title: "推荐"
        },
        {
          id: 2,
          title: "影视"
        }
      ],
      comments: []
    },
    {
      id: 3,
      title: "大理旅游攻略🎐和刘亦菲李现去有风的地方",
      content:
        "神仙姐姐和“现男友”主演的现代剧《去有风的地方》火了，剧里的景色更是让人挪不开眼睛。整理了剧中取景地的打卡攻略，一起去打卡许红豆跟谢之遥走过的路吧，记得点藏收藏哦。💕\n" +
        "路线地图在最后一张图）\n" +
        "1️⃣凤阳邑村：🌷有风小院🏡\n" +
        "导航“凤阳邑村”（距离大理古城约7.8公路）\n" +
        "学村口下车，看到汽车轮胎店，左侧道路直走尽头，然后右走，看到蓝色小风车🦋就是它了。\n" +
        "💗tips： 村子不大，村里的土楼像极了记忆中奶奶的家，慢慢悠悠的走走拍拍也只需要一个下午，村子里也有很有意思和趣味的店，比如白族烤茶、咖啡馆等等。\n" +
        "2️⃣沙溪古镇：🌷古戏台、🌷识东寨门、🌷识玉津桥\n" +
        "9导航沙溪古镇（距离大理古城约100公里，距离凤阳邑村134.2公里）\n" +
        "1. ﻿﻿✨学古戏台位于古镇广场，阿瑞奶奶的店和吃茶去的都在这里\n" +
        "2. ﻿✨必东寨门是进入古镇的门户，出门直走就能看\n" +
        "见\n" +
        // eslint-disable-next-line prettier/prettier
        "3.✨学从东寨门走出去百余米，便可看见横跨在黑潓江上的玉津桥了 💗Tips：古镇不大，但是很安静，在沙溪感受慢生活，是悠闲，是惬意。偶遇一场每周五的赶集\n" +
        "偶遇玉津桥旁放羊的老人，喝一杯下午茶，🌻阳光下感受岁月静好的时光。\n" +
        "3️⃣喜洲古镇：🌷识海舌公园、🌷璞真扎染博物馆、 🌷喜林苑\n" +
        "🗺️导航喜洲古镇（距离大理古城约20公里，距离沙溪古镇约110公里）\n" +
        "1.✨海舌公园位于喜洲古镇金河村北，在洱海西\n" +
        "畔\n" +
        "2.✨必璞真扎染位于周城村滇藏公路61号\n" +
        "3.﻿✨必喜林苑喜洲镇城北村5号\n" +
        "💗Tips： 这里是煮明的网红打卡地，一大片麦田+黄色艺术墙很好看。\n" +
        "4️⃣诺邓古村：🌷识云龙天灯海坪\n" +
        "🗺️导航诺邓村（距离大理古城约157公里，距离喜洲古镇约206.9公里）\n" +
        "✨#我的小众旅行攻略 学天灯海坪位于云龙县城西边 距离云龙县城约\n" +
        "40公里 海拔2550米，从云龙县城出发，沿着诺苗公路而上一路都是风景\n" +
        "💗Tips： 这里有保留最好的明清建筑群，随便路过一处都是百年古宅古树。🌳\n" +
        "•",
      time: "2025-02-13",
      avatar: "https://shiina-mahiru.cn/project/download/avatar.jpg",
      nickname: "随身小D",
      cover: "https://shiina-mahiru.cn/project/download/wind.png",
      likes: 1200,
      position: {
        id: 1,
        name: "大理"
      },
      category: [
        {
          id: 1,
          title: "推荐"
        },
        {
          id: 2,
          title: "影视"
        }
      ],
      comments: []
    },
    {
      id: 5,
      title: "东京旅游地图攻略",
      content: "依据旅游地图，打卡歌舞伎町、银座等景点，尽享东京繁华与精彩。",
      time: "2025-02-12",
      avatar: "https://shiina-mahiru.cn/project/download/avatar.jpg",
      nickname: "随身小D",
      cover: "https://shiina-mahiru.cn/project/download/dj.png",
      likes: 1200,
      position: {
        id: 1,
        name: "东京"
      },
      category: [
        {
          id: 1,
          title: "推荐"
        },
      ],
      comments: []
    },
    {
      id: 6,
      title: "阿勒泰精华路线攻略",
      content:
        "踏上阿勒泰精华路线，赏禾木、喀纳斯等美景，领略大自然的鬼斧神工。",
      time: "2025-02-13",
      avatar: "https://shiina-mahiru.cn/project/download/avatar.jpg",
      nickname: "随身小D",
      cover: "https://shiina-mahiru.cn/project/download/alt.png",
      likes: 1200,
      position: {
        id: 1,
        name: "东京"
      },
      category: [
        {
          id: 1,
          title: "推荐"
        },
      ],
      comments: []
    },
    {
      id: 1,
      title: "新加坡City Walk攻略",
      content:
        "跟随City Walk路线，打卡小印度、苏丹回教堂等，赏特色建筑，品别样文化。",
      time: "2025-02-09",
      avatar: "https://shiina-mahiru.cn/project/download/avatar.jpg",
      nickname: "随身小D",
      cover: "https://shiina-mahiru.cn/project/download/xjp.png",
      likes: 1200,
      position: {
        id: 1,
        name: "新加坡"
      },
      category: [
        {
          id: 1,
          title: "推荐"
        },
      ],
      comments: [
        {
          id: 1,
          time: "2025-02-09",
          content: "这是一条善意的评论。",
          avatar:
            "https://i1.hdslb.com/bfs/face/3a59c98c91d0e14d0a965e45577e6f5f7e73c6ce.jpg@96w_96h_1c_1s.avif",
          nickname: "椎名真昼"
        }
      ]
    },
    {
      id: 4,
      title: "成都City Walk攻略",
      content: "沿着懒人路线，游熊猫基地、宽窄巷子等地，体验成都的惬意与古韵。",
      time: "2025-02-11",
      avatar: "https://shiina-mahiru.cn/project/download/avatar.jpg",
      nickname: "随身小D",
      cover: "https://shiina-mahiru.cn/project/download/cd.png",
      likes: 1200,
      position: {
        id: 1,
        name: "成都"
      },
      category: [
        {
          id: 1,
          title: "推荐"
        },
      ],
      comments: []
    },
  ]);
  const postCategoryList = ref<PostCategoryList>([
    {
      id: 1,
      title: "推荐"
    },
    {
      id: 2,
      title: "影视"
    },
    {
      id: 3,
      title: "自拍"
    },
    {
      id: 4,
      title: "交友"
    },
    {
      id: 5,
      title: "美食"
    }
  ]);
  const sendComment = (comment: CommentDetail, index: number) => {
    postList.value[index].comments.push(comment);
  };
  return { createPostPoint, postList, postCategoryList, sendComment };
});
