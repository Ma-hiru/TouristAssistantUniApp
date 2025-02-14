//TODO 音频播放
const audioCtx = uni.createInnerAudioContext();
export const defaultVolume = 0.7;
export const useAudio = (url: string) => {
  audioCtx.stop();
  audioCtx.src = url;
  return audioCtx;
};
export const useVolume = <T extends number>(Volume: ValidateVolume<T>) => {
  audioCtx.volume = Volume;
};
export const useAudioStop = () => {
  audioCtx.stop();
};
(function init() {
  audioCtx.volume = defaultVolume;
})();
type ValidateVolume<T extends number> = T extends 0 | 1
  ? T
  : `${T}` extends `0.${number}`
  ? T
  : never;
