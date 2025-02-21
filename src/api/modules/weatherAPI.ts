import { CityType, WeatherType } from "@/types/weather";
import { API, WeatherApiKey } from "@/settings";

export const getLocalWeatherData = (city: string): Promise<WeatherType> =>
  new Promise((resolve, reject) => {
    uni.request({
      url: `${API.LOCAL_WEATHER}?location=${city}&lang=zh&unit=m`,
      method: "GET",
      header: {
        "X-QW-Api-Key": WeatherApiKey,
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300)
          resolve(res.data as WeatherType);
        else {
          uni.showToast({ title: "获取天气失败", icon: "none" }).then();
          reject(res);
        }
      },
      fail: (err) => {
        uni.showToast({ title: "网络错误", icon: "none" }).then();
        reject(err);
      },
    });
  });

export const getCityLocation = (city: string = "北京"): Promise<CityType> =>
  new Promise((resolve, reject) => {
    uni.request({
      method: "GET",
      url: `${API.LOCAL_CITY}?location=${city}`,
      header: {
        "X-QW-Api-Key": WeatherApiKey,
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300)
          resolve(res.data as CityType);
        else {
          uni.showToast({ title: "获取天气失败", icon: "none" }).then();
          reject(res);
        }
      },
      fail: (err) => {
        uni.showToast({ title: "网络错误", icon: "none" }).then();
        reject(err);
      },
    });
  });
