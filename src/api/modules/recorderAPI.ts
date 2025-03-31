import { upload } from "@/utils";
import { API } from "@/settings";

export const reqUploadRecorder = (path: string) =>
  upload<string | { text: string }>({
    url: API.RECORD_URL,
    header: {
      "Content-Type": "multipart/form-data",
    },
    filePath: path,
    name: "file",
  });
