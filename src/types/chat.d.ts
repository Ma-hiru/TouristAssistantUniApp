import { Point, Position } from "@/types/map";

export interface Message {
  /** 唯一id user这里前端生成（只要一个用户下唯一就好） */
  id: number;
  content: string;
  /** 后面是否还有分片，true就意味着正在流式传输，false表示传输完毕 */
  hasSlice: boolean;
  /** 格式`YYYY-MM-DD hh:mm`,user时间由前端提供 */
  time: string;
  /** 消息类型，三选一 */
  type: "user" | "system" | "assistant";
  /** 路线 */
  polyline: {
    isPolyline: boolean;
    polyline: Position[];
  };
  /** 当前位置 */
  // location: {
  //   latitude: number | null;
  //   longitude: number | null;
  // };
}

export type AntdMiniPromptsItem = {
  key: string;
  icon: string;
  label: string;
  description: string;
  showArrow: boolean;
};
export type AntdMiniPromptsCustomEventType = {
  detail: [item: AntdMiniPromptsItem, index: number];
};

export type UserPlan = {
  selectedTime: number;
  selectType: string;
  selectedPoint: Point;
  selectedSightseeingType: string;
};
