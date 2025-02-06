import { CityType, WeatherData, WeatherType } from "@/types/weather";
import { getCityLocation, getLocalWeatherData } from "@/api";

export const useWeatherData = async (): Promise<WeatherData> =>
  new Promise((resolve, reject) => {
    async function save(locationInfo?: string) {
      try {
        const city: CityType = await getCityLocation(locationInfo ?? "雨湖区");
        const weather: WeatherType = await getLocalWeatherData(
          city.location[0].id
        );
        const cityName = city.location[0].name;
        const temp = weather.now.temp;
        const icon = weather.now.icon;
        const weatherData = weather.now.text;
        resolve({
          city,
          weather,
          cityName,
          weatherData,
          temp,
          icon,
        });
      } catch (e) {
        reject(e);
      }
    }

    uni.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      success: function ({ longitude, latitude }) {
        return save(`${longitude.toFixed(2)},${latitude.toFixed(2)}`);
      },
      fail: function () {
        return save(undefined);
      },
    });
  });
