interface ChatBase {
  id: number;
  userId: number;
  content: string;
}

/** 可辨识联合类型（Discriminated Unions） */
export type Chat<T extends boolean> = ChatBase &
  (
    | {
        type: "assistant";
        time: string;
        isAdd: boolean;
        isPolyline: {
          id: T extends true ? number : undefined;
          isPolyline: T;
          polyline: T extends true ? MapPolyline[] : undefined;
        };
      }
    | {
        type: "user";
        time: string;
        isAdd: boolean;
      }
    | { type: "system"; time: undefined; isAdd: undefined }
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
