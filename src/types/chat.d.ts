import { MapPolyline } from "@uni-helper/uni-app-types";

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
    polyline: MapPolyline[];
  };
  /** 当前位置 */
  location?: {
    latitude: number;
    longitude: number;
  };
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
/** 类型体操偷懒 */
// type customEventType = {
//   detail: [item: (typeof baseList.value)[number], index: number];
// };
