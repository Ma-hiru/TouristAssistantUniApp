import { http } from "@/utils";
import { cardURL } from "@/api";
import { CardParams, CardResponseData } from "@/types/card";
export const reqGetCard = (data: CardParams) =>
  http<CardResponseData>({
    url: cardURL,
    method: "POST",
    data,
  });
