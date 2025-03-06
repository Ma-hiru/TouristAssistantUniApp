import { http } from "@/utils";
import { API } from "@/settings";
import { Point, Position } from "@/types/map";

export const reqGetNearByPoints = (data: Position) =>
  http<number[]>({
    url: API.MAP_NEAR_POINTS,
    method: "POST",
    data,
  });
export const reqGetPointDetail = (id: number) =>
  http<Point>({
    url: `${API.MAP_GET_POINT_DETAIL}/${id}`,
    method: "GET",
  });
