/** `基础坐标`*/
export interface Position {
  /** `纬度，浮点数，范围为-90~90，负数表示南纬`*/
  latitude: number;
  /** `经度，范围为-180~180，负数表示西经`*/
  longitude: number;
}
