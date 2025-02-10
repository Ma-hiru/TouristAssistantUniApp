/** `基础坐标`*/
export interface Position {
  /** `纬度，浮点数，范围为-90~90，负数表示南纬`*/
  latitude: number;
  /** `经度，范围为-180~180，负数表示西经`*/
  longitude: number;
}
/** `地点信息` */
export type Point = {
  /**
   * 地点 ID
   *
   * 最大限制 9 位数
   */
  id: number;
  /**
   * 地点名
   */
  title: string;
  /**
   * 地点坐标
   */
  position: Position;
  /**
   * 图标路径
   *
   * 项目目录下的图片路径，支持相对路径和临时路径
   */
  iconPath?: string;
  /**
   * 地点详情
   * */
  detail: PointDetail;
};
export type PointDetail = {
  /** 介绍文本 */
  content: string;
  /** 地理位置 */
  position: string;
  /** 封面 */
  cover: string;
  /** 联系电话 */
  tel: string;
  /** 开放时间 */
  time: string;
  /** 门票价格 */
  price: string;
};
export type PointList = Point[];
