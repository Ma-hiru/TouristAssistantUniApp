import { useUserStore } from "@/stores";
import { reqURL } from "@/settings";
import type { ResponseData } from "@/types/api";

const userStore = useUserStore();
const httpInterceptor: UniApp.InterceptorOptions = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    !options.url.startsWith("http") && (options.url = reqURL + options.url);
    options.timeout = 30000;
    options.header = {
      "source-client": "miniapp",
      ...options.header,
    };
    const token = userStore.userProfile.token;
    token && (options.header["Authorization"] = token);
  },
};
uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("uploadFile", httpInterceptor);

/**
 * 封装的uni.request请求
 * @param options 原始 uni.request 参数
 * @param success
 * @return Promise<Data<T>> 返回响应数据（类型T）的包装体
 */
export const http = <T>(
  options: UniApp.RequestOptions
): Promise<ResponseData<T>> =>
  new Promise((resolve, reject) => {
    uni.request({
      ...options,
      sslVerify: false,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as ResponseData<T>);
          //TODO 身份认证失败的处理
        } else if (res.statusCode === 401) {
          uni
            .showToast({
              icon: "none",
              title: (res.data as ResponseData<T>)?.msg ?? "身份认证失败",
            })
            .then();
          uni.navigateTo({ url: "/pages/login/login" }).then();
          reject(res);
        } else {
          uni
            .showToast({
              icon: "none",
              title: (res.data as ResponseData<T>)?.msg || "请求错误",
            })
            .then();
          reject(res);
        }
      },
      fail(err) {
        uni.showToast({ icon: "none", title: "网络错误，换个网络试试" }).then();
        reject(err);
      },
    });
  });
export const upload = <T>(
  options: UniApp.UploadFileOption
): Promise<ResponseData<T>> =>
  new Promise((resolve, reject) => {
    uni.uploadFile({
      ...options,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(res.data) as ResponseData<T>);
        } else {
          uni
            .showToast({
              icon: "none",
              title:
                (JSON.parse(res.data) as ResponseData<T>)?.msg || "请求错误",
            })
            .then();
          reject(res);
        }
      },
      fail: (err) => {
        uni.showToast({ icon: "none", title: "网络错误，换个网络试试" }).then();
        reject(err);
      },
    });
  });
