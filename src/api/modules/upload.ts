import UploadFileOption = UniNamespace.UploadFileOption;
import { reqURL } from "./baseURL";

export const upload = (options: UploadFileOption) => {
  options.url = reqURL + options.url;
  return uni.uploadFile(options);
};
