import { BufferResult } from "@/types/card";

export const convertBufferResultToArrayBuffer = (
  result: BufferResult
): ArrayBuffer => {
  const buffer = new ArrayBuffer(result.data.length);
  //可以直接创建Uint8Array的视图
  const view = new DataView(buffer);
  result.data.forEach((byte, index) => view.setUint8(index, byte));
  return buffer;
};

export const saveTempImage = async (buffer: ArrayBuffer): Promise<string> => {
  return new Promise((resolve) => {
    const filePath = `${wx.env.USER_DATA_PATH}/temp_${Date.now()}.png`;
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
