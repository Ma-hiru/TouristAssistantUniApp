type ValidateVolume<T extends number> = T extends 0 | 1
  ? T
  : `${T}` extends `0.${number}`
  ? T
  : never;
type PLayList = {
  list: string[];
  currentIndex: number;
  ended: boolean;
};

export class Audio {
  private readonly AudioInstance: null | UniNamespace.InnerAudioContext = null;
  private readonly PlayList: PLayList = {
    list: [],
    ended: false,
    currentIndex: 0,
  };
  public readonly DefaultVolume = 0.7;

  constructor() {
    this.AudioInstance = uni.createInnerAudioContext();
    this.AudioInstance.volume = this.DefaultVolume;
  }

  public AddAudio = (url: string) => {
    if (this.PlayList.ended) {
      this.PlayList.list.push(url);
      this.PlayList.ended = false;
      if (this.AudioInstance) {
        this.AudioInstance.src = this.PlayList.list[this.PlayList.currentIndex];
        this.AudioInstance.play();
      }
    }
    console.log("currentList", this.PlayList.list.length);
    this.PlayList.list.push(url);
    if (this.PlayList.list.length === 1) {
      if (this.AudioInstance) {
        this.PlayAudio();
      }
    }
  };
  public CanPlay = () => {
    if (!this.AudioInstance) throw Error("No Instance");
    return this.PlayList.list.length === 0;
  };
  public RemoveAudio = () => {
    if (this.AudioInstance) {
      this.AudioInstance.stop();
      this.AudioInstance.destroy();
    }
  };
  public SetVolume = <T extends number>(Volume: ValidateVolume<T>) => {
    if (this.AudioInstance) this.AudioInstance.volume = Volume;
  };
  public StopAudio = () => {
    if (this.AudioInstance) this.AudioInstance.stop();
    this.PlayList.list = [];
    this.PlayList.currentIndex = 0;
  };
  public PauseAudio = () => {
    if (this.AudioInstance) this.AudioInstance.pause();
  };
  public ContinueAudio = () => {
    if (this.AudioInstance) this.AudioInstance.play();
  };
  public PlayAudio = () => {
    if (this.AudioInstance) {
      this.AudioInstance.src = this.PlayList.list[this.PlayList.currentIndex];
      this.AudioInstance.onEnded(() => {
        this.PlayList.currentIndex++;
        if (this.PlayList.currentIndex < this.PlayList.list.length) {
          this.AudioInstance!.src =
            this.PlayList.list[this.PlayList.currentIndex];
          this.AudioInstance!.play();
        } else {
          this.PlayList.ended = true;
        }
      });
      this.AudioInstance.play();
    }
  };
  public IsValidated = () => {
    return !this.AudioInstance;
  };
}
