import dayjs from "dayjs";

export function GetTime(): string {
  return dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss");
}
