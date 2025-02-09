import pinia, { useUserStore } from "../../stores";
import { http } from "@/utils";
import {
  LoginInfo,
  RegisterInfo,
  ReqLoginResponseData,
  ReqRegisterResponseData,
} from "@/types/api";

const userStore = useUserStore(pinia);

enum API {
  LOGIN = "/wechat/login",
  REGISTER = "/wechat/register",
}
export const reqLogin = (data: LoginInfo) =>
  http<ReqLoginResponseData>({
    url: `${API.LOGIN}?code=${data.code}`,
    method: "GET",
  });
export const reqRegister = (data: RegisterInfo) =>
  http<ReqRegisterResponseData>({
    url: API.REGISTER,
    method: "POST",
    data,
  });
