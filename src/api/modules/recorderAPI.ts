import { http, upload } from "@/utils";
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
export const reqTextToVoice = async (text: string): Promise<string> => {
  const buffer = (await http<ArrayBuffer>({
    url: API.TEXT_TO_VOICE,
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    responseType: "arraybuffer",
    data: { text },
  })) as unknown as ArrayBuffer;
  console.log("buffer", buffer.byteLength);
  console.dir("buffer", buffer);
  return new Promise((resolve) => {
    const filePath = `${wx.env.USER_DATA_PATH}/temp_${Date.now()}.mp3`;
    try {
      const fs = wx.getFileSystemManager();
      fs.writeFile({
        filePath,
        data: buffer,
        encoding: "binary",
        success: () => {
          resolve(filePath);
        },
        fail: () => resolve(""),
      });
    } catch {
      resolve("");
    }
  });
};
