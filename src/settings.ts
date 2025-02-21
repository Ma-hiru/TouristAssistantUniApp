import { CharsetYIYAN, EncodeYIYAN, TypeYIYAN } from "@/types/card";

export const rem = 16;
export const mapScale = 18.5;
export const appearanceList = [
  "https://shiina-mahiru.cn/download/appearance_female.jpg",
  "https://shiina-mahiru.cn/download/appearance_male.jpg",
];
export const defaultAppearance = 0;
export const ScenicName = "某景区";
export const reqURL = import.meta.env.VITE_URL;
export const wsURL = import.meta.env.VITE_WS;

export enum API {
  CHECK_CARD = "https://shiina-mahiru.cn/api/card",
  CHECK_YIYAN = "https://shiina-mahiru.cn/api/yiyan",
  GUIDE_CATEGORY = "/wechat/category",
  GUIDE_POST_LIST = "/wechat/postList",
  UPLOAD_AVATAR = "/wechat/avatar",
  USER_LOGIN = "/wechat/login",
  USER_REGISTER = "/wechat/register",
  LOCAL_WEATHER = "https://devapi.qweather.com/v7/weather/now",
  LOCAL_CITY = "https://geoapi.qweather.com/v2/city/lookup",
}

export const WeatherApiKey = "5e185d3411dc4d5bb0e0a276a704ea63";

export const DetailYIYANURL = "https://hitokoto.cn?uuid=";

export const ModelYIYAN = {
  charset: CharsetYIYAN.utf8,
  encode: EncodeYIYAN.json,
  c: TypeYIYAN.i,
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
