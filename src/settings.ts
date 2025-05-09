import { CharsetYIYAN, EncodeYIYAN, TypeYIYAN } from "@/types/card.d";
import avatar1 from "@/static/chat/assistant_avatar1.png";
import avatar2 from "@/static/chat/assistant_avatar2.jpg";
import avatar3 from "@/static/chat/assistant_avatar3.jpg";
import avatar4 from "@/static/chat/assistant_avatar4.jpg";
import { AntdMiniPromptsItem, UserPlan } from "@/types/chat";
import { MapCallout } from "@uni-helper/uni-app-types";

export enum API {
  CHECK_CARD = "https://shiina-mahiru.cn/sub/touristassistant/api/card",
  CHECK_YIYAN = "https://shiina-mahiru.cn/sub/touristassistant/api/yiyan",
  GUIDE_CATEGORY = "/wechat/category",
  GUIDE_POST_LIST = "/wechat/postList",
  UPLOAD_AVATAR = "/wechat/register",
  USER_LOGIN = "/wechat/login",
  USER_REGISTER = "/wechat/register",
  LOCAL_WEATHER = "https://devapi.qweather.com/v7/weather/now",
  LOCAL_CITY = "https://geoapi.qweather.com/v2/city/lookup",
  MAP_NEAR_POINTS = "/points/nearby-ids",
  MAP_GET_POINT_DETAIL = "/points",
  MAP_GET_ALL_POINT = "/all",
  RECORD_URL = "/api/ai/transcript",
  TEXT_TO_VOICE = "/api/ai/synthesis",
}

export const rem = 16;
export const mapScale = 18.5;
export const appearanceList = [
  "https://shiina-mahiru.cn/sub/touristassistant/download/appearance_female.jpg",
  "https://shiina-mahiru.cn/sub/touristassistant/download/appearance_male.jpg",
  "https://shiina-mahiru.cn/sub/touristassistant/download/appearance_others_01.jpg",
  "https://shiina-mahiru.cn/sub/touristassistant/download/appearance_others_02.jpg",
  "https://shiina-mahiru.cn/sub/touristassistant/download/appearance_others_03.jpg",
  "https://shiina-mahiru.cn/sub/touristassistant/download/appearance_others_04.jpg",
];
export const avatarList = [avatar1, avatar2, avatar3, avatar4];
export const defaultAppearance = 0;
export const defaultAvatar = 0;
export const ScenicName = "某景区";
export const reqURL = import.meta.env.VITE_URL;
export const wsURL = import.meta.env.VITE_WS;
export const WeatherApiKey = "5e185d3411dc4d5bb0e0a276a704ea63";
export const DetailYIYANURL = "https://hitokoto.cn?uuid=";
export const ModelYIYAN = {
  charset: CharsetYIYAN.utf8,
  encode: EncodeYIYAN.json,
  c: TypeYIYAN.k,
  min_length: 15,
  max_length: 20,
};
export const ModelCard = {
  temp: "tempB",
  color: "dark-color-2",
  qrcodetext: "扫描二维码",
  qrcode: "https://shiina-mahiru.cn/",
  watermark: "随身小D",
  switchConfig: {
    showIcon: "false",
    showForeword: "false",
  },
};
export const PlanTime = [{ val: 30 }, { val: 45 }, { val: 60 }, { val: 90 }];
export const defaultTime = PlanTime[0];
export const goOutType = [
  {
    name: "骑行",
    icon: () => import("@/pages_sub/default/static/plan/bike.svg"),
    select: () => import("@/pages_sub/default/static/plan/bike_select.svg"),
  },
  {
    name: "公交",
    icon: () => import("@/pages_sub/default/static/plan/bus.svg"),
    select: () => import("@/pages_sub/default/static/plan/bus_select.svg"),
  },
  {
    name: "汽车",
    icon: () => import("@/pages_sub/default/static/plan/car.svg"),
    select: () => import("@/pages_sub/default/static/plan/car_select.svg"),
  },
  {
    name: "地铁",
    icon: () => import("@/pages_sub/default/static/plan/subway.svg"),
    select: () => import("@/pages_sub/default/static/plan/subway_select.svg"),
  },
  {
    name: "步行",
    icon: () => import("@/pages_sub/default/static/plan/walk.svg"),
    select: () => import("@/pages_sub/default/static/plan/walk_select.svg"),
  },
];
export const defaultGoOutType = goOutType[0];
export const sightseeingType = [
  {
    name: "观光型",
    desc: "打卡地标景点。",
    icon: () => import("@/pages_sub/default/static/plan/sightsee/see.svg"),
    select: () =>
      import("@/pages_sub/default/static/plan/sightsee/see_select.svg"),
  },
  {
    name: "体验型",
    desc: "融入当地文化。",
    icon: () => import("@/pages_sub/default/static/plan/sightsee/culture.svg"),
    select: () =>
      import("@/pages_sub/default/static/plan/sightsee/culture_select.svg"),
  },
  {
    name: "休闲型",
    desc: "放松身心。",
    icon: () => import("@/pages_sub/default/static/plan/sightsee/holiday.svg"),
    select: () =>
      import("@/pages_sub/default/static/plan/sightsee/holiday_select.svg"),
  },
  {
    name: "探险型",
    desc: "挑战极限。",
    icon: () => import("@/pages_sub/default/static/plan/sightsee/zoomIn.svg"),
    select: () =>
      import("@/pages_sub/default/static/plan/sightsee/zoomIn_select.svg"),
  },
  {
    name: "美食型",
    desc: "探店当地特色餐厅和小吃。",
    icon: () => import("@/pages_sub/default/static/plan/sightsee/food.svg"),
    select: () =>
      import("@/pages_sub/default/static/plan/sightsee/food_select.svg"),
  },
  {
    name: "摄影型",
    desc: "以拍摄风景、人文为主题的专业旅行。",
    icon: () =>
      import("@/pages_sub/default/static/plan/sightsee/photography.svg"),
    select: () =>
      import("@/pages_sub/default/static/plan/sightsee/photography_select.svg"),
  },
  {
    name: "学习型",
    desc: "语言课程、学术交流、技能培训。",
    icon: () => import("@/pages_sub/default/static/plan/sightsee/study.svg"),
    select: () =>
      import("@/pages_sub/default/static/plan/sightsee/study_select.svg"),
  },
];
export const defaultSightseeingype = sightseeingType[0];
export const PlanToText = (plan: UserPlan): string => {
  return `我计划是：
--浏览时长：${plan.selectedTime ?? "-- "}min，
--游览方式：${plan.selectType ?? "无"}，
--游览偏好：${plan.selectedSightseeingType ?? "无"}，
--所在地点：${plan.selectedPoint.title ?? "无"}，
小D，帮我规划一下吧！`;
};
export const defaultChatWelcomeText: AntdMiniPromptsItem[] = [
  {
    showArrow: true,
    label: "热门提问：",
    description: "武功山有什么特色？",
    icon: "LikeOutline",
    key: "1",
  },
  {
    showArrow: true,
    label: "路线规划：",
    icon: "StarOutline",
    description: "武功山一小时的速览路线~",
    key: "2",
  },
  {
    showArrow: true,
    label: "讲解一下：",
    icon: "PlayOutline",
    description: "武功山风景如何",
    key: "3",
  },
];
const weatherUrl = "https://shiina-mahiru.cn/weatherIcon";
export const GetWeatherIconUrl = (
  iconIndex: string | null | undefined,
  style: "fill" | "line",
  color: "white" | "black",
  defaultIcon: number
) => {
  const prefix = weatherUrl + `/${color}/`;
  const suffix = `${style === "fill" ? "-fill" : ""}.svg`;
  const defaultUrl = prefix + defaultIcon + suffix;
  if (iconIndex === null || iconIndex === undefined) {
    return defaultUrl;
  }
  const id = Number(iconIndex);
  if (Number.isNaN(id) || id === 0) {
    return defaultUrl;
  }
  return prefix + id + suffix;
};
export const CHAT_TIME_OUT = 99999999;
export const CHAT_STOP_MSG = "stop";
export const CHAT_LEAVE_MSG = "leave";
export const VOICE_BUFFER_LEN = 20;
export const MarkerCallout = {
  color: "#0066d5",
  bgColor: "#fff",
  padding: 12,
  borderRadius: 4,
  display: "ALWAYS",
  fontSize: 16,
  borderWidth: 0,
  borderColor: "#fff",
  textAlign: "center",
} satisfies Omit<MapCallout, "content">;
