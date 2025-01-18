import UploadFileOption = UniNamespace.UploadFileOption;
import { reqURL } from "@/api";

export const upload = (options: UploadFileOption) => {
  options.url = reqURL + options.url;
  return uni.uploadFile(options);
};
