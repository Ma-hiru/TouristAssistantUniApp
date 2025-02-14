import { Position } from "@/types/map";

export const useLocation = async (): Promise<Position> => {
  const res = await uni.getLocation({
    type: "gcj02",
    isHighAccuracy: true,
  });
  return {
    latitude: res.latitude,
    longitude: res.longitude,
  };
};
