import { http } from "@/utils";
import {
  CardParams,
  CardResponseData,
  GetYIYANInfo,
  YIYANResponseData,
} from "@/types/card";
import { API } from "@/settings";

export const reqGetCard = (data: CardParams) =>
  http<CardResponseData>({
    url: API.CHECK_CARD,
    method: "POST",
    sslVerify: false,
    data,
  });

export const reqGetYIYAN = (data: GetYIYANInfo) =>
  http<YIYANResponseData>({
    url: API.CHECK_YIYAN,
    method: "POST",
    data,
  });
