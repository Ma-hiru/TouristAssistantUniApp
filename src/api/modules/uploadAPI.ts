import UploadFileOption = UniNamespace.UploadFileOption;
import { reqURL } from "@/api";

export const uploadAPI = (options: UploadFileOption) => {
  options.url = reqURL + options.url;
  return uni.uploadFile(options);
};
