interface ChatBase {
  id: number;
  userId: number;
  content: string;
}

/** 可辨识联合类型（Discriminated Unions） */
export type Chat = ChatBase &
  (
    | {
        type: "assistant";
        time: string;
        isAdd: boolean;
        isPolyline: {
          id?: number;
          isPolyline: boolean;
          polyline?: MapPolyline[];
        };
      }
    | {
        type: "user";
        time: string;
        isAdd: boolean;
      }
    | { type: "system" }
  );

export type ChatList = Chat[];

interface Message {
  id: number; //唯一id user这里前端生成（只要一个用户下唯一就好）
  content: string; //消息内容
  hasSlice: boolean; //后面是否还有分片，true就意味着正在流式传输，false表示传输完毕
  type: "user" | "system" | "assistant"; //消息类型，三选一
  time: string; //时间 格式`YYYY-MM-DD hh:mm`,user时间由前端提供
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
