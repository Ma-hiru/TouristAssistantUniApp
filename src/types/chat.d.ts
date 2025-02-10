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
