import pinia, { useUserStore } from "../../stores";
import { http } from "@/api";

const userStore = useUserStore(pinia);

enum API {
  Test = "/api/test",
}

export const reqTest = (): Promise<any> => {
  console.log(userStore.profile.token);
  return http({
    method: "POST",
    url: API.Test,
    data: {
      token: userStore.profile.token,
    },
  });
};
