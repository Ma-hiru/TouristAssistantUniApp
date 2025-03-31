import { UploadAvatarInfo } from "@/types/upload";
import { ReqRegisterResponseData } from "@/types/api";
import { upload } from "@/utils";
import { API } from "@/settings";

export const reqUploadAvatar = async (options: UploadAvatarInfo) =>
  upload<ReqRegisterResponseData>({
    url: API.UPLOAD_AVATAR,
    ...options,
  });
