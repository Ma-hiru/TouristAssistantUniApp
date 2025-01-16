import axios from "axios";
import { reqURL } from "./baseURL.ts";
import pinia, { useUserStore } from "../../stores";
//@ts-ignore
import { UniAdapter } from "uniapp-axios-adapter";

const userStore = useUserStore(pinia);
export const request = axios.create({
  baseURL: reqURL,
  timeout: 20000,
  adapter: UniAdapter,
});
request.interceptors.request.use((config) => {
  config.headers["authorization"] = `Bearer ${userStore.token}`;
  return config;
});
request.interceptors.response.use(
  (res) => {
    if (res.headers.Authorization) {
      userStore.token = res.headers.Authorization;
    }
    return res.data;
  },
  (e) => {
    console.log(`请求出错！`, e);
  }
);
