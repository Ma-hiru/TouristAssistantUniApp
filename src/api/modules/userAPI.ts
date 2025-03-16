import { http } from "@/utils";
import {
  LoginInfo,
  RegisterInfo,
  ReqLoginResponseData,
  ReqRegisterResponseData,
} from "@/types/api";
import { API } from "@/settings";

export const reqLogin = (data: LoginInfo) =>
  http<ReqLoginResponseData>({
    url: API.USER_LOGIN,
    method: "POST",
    data,
  });
export const reqRegister = (data: RegisterInfo) =>
  http<ReqRegisterResponseData>({
    url: API.USER_REGISTER,
    method: "POST",
    data,
  });
