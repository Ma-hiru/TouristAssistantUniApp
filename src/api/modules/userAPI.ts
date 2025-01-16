import pinia, { useUserStore } from "../../stores";
import { http } from "./http";

const userStore = useUserStore(pinia);

enum API {
  Test = "/api/test",
}

export const reqTest = (): Promise<any> => {
  console.log(userStore.token);
  return http({
    method: "POST",
    url: API.Test,
    data: {
      token: userStore.token,
    },
  });
};
