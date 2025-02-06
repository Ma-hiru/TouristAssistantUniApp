/**
 * @description `城市信息类型`
 * */
export type CityType = {
  /**请参考状态码*/
  code: string;
  location: [
    {
      /**地区/城市名称 */
      name: string;
      /**地区/城市ID */
      id: string;
      /** 地区/城市纬度*/
      lat: string;
      /**地区/城市经度 */
      lon: string;
      /** 地区/城市的上级行政区划名称*/
      adm2: string;
      /**地区/城市所属一级行政区域 */
      adm1: string;
      /** 地区/城市所属国家名称*/
      country: string;
      /** 地区/城市所在时区 */
      tz: string;
      /** 地区/城市目前与UTC时间偏移的小时数，参考详细说明 */
      utcOffset: string;
      /**地区/城市是否当前处于夏令时。1 表示当前处于夏令时，0 表示当前不是夏令时。 */
      isDst: string;
      /**地区/城市的属性 */
      type: string;
      /**  地区评分*/
      rank: string;
      /** 该地区的天气预报网页链接，便于嵌入你的网站或应用*/
      fxLink: string;
    }
  ];
  refer: {
    /** 原始数据来源，或数据源说明，可能为空 */
    sources: [string];
    /**数据许可或版权声明，可能为空 */
    license: [string];
  };
};
/**
 * @description `获取本地天气数据`
 * */
export type WeatherType = {
  /** 请参考状态码*/
  code: string;
  /** 当前API的最近更新时间*/
  updateTime: string;
  /**当前数据的响应式页面，便于嵌入网站或应用*/
  fxLink: string;
  now: {
    /** 数据观测时间 */
    obsTime: string;
    /** 温度，默认单位：摄氏度*/
    temp: string;
    /** 体感温度，默认单位：摄氏度 */
    feelsLike: string;
    /** 天气状况的图标代码，另请参考天气图标项目*/
    icon: string;
    /**天气状况的文字描述，包括阴晴雨雪等天气状态的描述 */
    text: string;
    /** 风向 360\角度*/
    wind360: string;
    /** 风向 */
    windDir: string;
    /**风力等级 */
    windScale: string;
    /**  风速，公里/小时*/
    windSpeed: string;
    /** 相对湿度，百分比数值 */
    humidity: string;
    /**过去1小时降水量，默认单位：毫米 */
    precip: string;
    /**  大气压强，默认单位：百帕*/
    pressure: string;
    /** 能见度，默认单位：公里*/
    vis: string;
    /** 云量，百分比数值。可能为空*/
    cloud: string;
    /** 露点温度。可能为空*/
    dew: string;
  };
  refer: {
    /**原始数据来源，或数据源说明，可能为空*/
    sources: [string];
    /**数据许可或版权声明，可能为空*/
    license: [string];
  };
};
/** `获取天气数据hook 返回类型` */
export type WeatherData = {
  city: CityType;
  weather: WeatherType;
  cityName: string;
  weatherData: string;
  temp: string;
  icon: string;
};
