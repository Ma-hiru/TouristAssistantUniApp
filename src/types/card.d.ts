const colorEnum = [
  "dark-color-1",
  "dark-color-2",
  "light-blue-color-1",
  "light-blue-color-2",
  "light-blue-color-3",
  "light-blue-color-4",
  "light-blue-color-5",
  "light-blue-color-6",
  "light-blue-color-7",
  "light-blue-color-8",
  "light-blue-color-9",
  "light-blue-color-10",
  "light-blue-color-11",
  "light-blue-color-12",
  "light-blue-color-13",
  "light-blue-color-14",
  "light-blue-color-15",
  "light-blue-color-16",
  "light-red-color-1",
  "light-red-color-2",
  "light-red-color-3",
  "light-red-color-4",
  "light-red-color-5",
  "light-red-color-6",
  "light-red-color-7",
  "light-red-color-8",
  "light-red-color-9",
  "light-red-color-10",
  "light-red-color-11",
  "light-red-color-12",
  "light-red-color-13",
  "light-red-color-14",
  "light-red-color-15",
  "light-red-color-16",
  "light-green-color-1",
  "light-green-color-2",
  "light-green-color-3",
  "light-green-color-4",
  "light-green-color-5",
  "light-green-color-6",
  "light-green-color-7",
  "light-green-color-8",
  "light-green-color-9",
  "light-green-color-10",
  "light-green-color-11",
  "light-green-color-12",
  "light-green-color-13",
  "light-green-color-14",
  "light-green-color-15",
];
type color = (typeof colorEnum)[number];
type switchConfig = {
  /**图标显示*/
  showIcon?: "true" | "false";
  /**日期显示*/
  showDate?: "true" | "false";
  /**标题显示*/
  showTitle?: "true" | "false";
  /**文本显示*/
  showContent?: "true" | "false";
  /**作者显示*/
  showAuthor?: "true" | "false";
  /**文本计数*/
  showTextCount?: "true" | "false";
  /**二维码*/
  showQRCode?: "true" | "false";
  /**前言*/
  showForeword?: "true" | "false";
};
type useFont =
  /**默认*/
  | "Source_Han_Sans_SC"
  /**思源宋体-SemiBold*/
  | "SourceHanSerifCN_SemiBold"
  /**思源宋体-Bold*/
  | "SourceHanSerifCN_Bold"
  /**仓耳渔阳体W03*/
  | "CangErYuYangTiW03"
  /**汇文明朝体*/
  | "Huiwen_mingchao"
  /**朱雀仿宋*/
  | "ZhuqueFangsong"
  /**小米-Light*/
  | "MiSans-Light"
  /**小米-Normal*/
  | "MiSans-Thin"
  /**小米-ExtraLight*/
  | "MiSans-ExtraLight"
  /**抖音美好体*/
  | "DouyinSansBold";
export type CardParams = {
  /** 模板选择 ，目前仅有：tempA、tempB、tempC */
  temp?: "tempA" | "tempB" | "tempC";
  /** 颜色 */
  color?: color;
  /** unknown */
  textcount: string;
  /** 图标 */
  icon?: string;
  /** 卡片  title */
  title?: string;
  /** 时间显示 */
  date?: string;
  /** 卡片正文 */
  content?: string;
  /** 前言 */
  foreword?: string;
  /** 作者 */
  author?: string;
  /** 二维码头部 */
  qrcodetitle?: string;
  /** 二维码描述文字 */
  qrcodetext?: string;
  /** 你的二维码链接 */
  qrcode?: string;
  /** 你的二维码图片（优先级比qrcode高，选其一即可） */
  qrcodeImg?: string;
  /** 水印 */
  watermark?: string;
  /** 展示控制 */
  switchConfig?: switchConfig;
  /** 宽度，最小 300 */
  width?: string;
  /** 高度 */
  height?: string;
  /** 内边距 */
  padding?: string;
  /** 文字大小比例 （例如传入1.2或者1.4等）*/
  fontScale?: string;
  /** 是否加载模板默认字体，默认情况下 api 为了更快的请求速度是不加载字体的*/
  useLoadingFont?: boolean;
  /** 指定字体类型 ，字体类型*/
  useFont?: useFont;
  /** 图片清晰度 ，默认为 2，数值越大越清晰，同时下载时间也更长*/
  imgScale?: string;
  /** 是否使用  html 解析，默认为 false，使用 md 语法解析*/
  isContentHtml?: string;
};
export type CardResponseData = BufferResult;

export interface BufferResult {
  data: number[];
  type: "Buffer";
}
