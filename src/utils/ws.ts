import ConnectSocketOption = UniNamespace.ConnectSocketOption;
import SocketTask = UniNamespace.SocketTask;
import OnSocketOpenCallbackResult = UniNamespace.OnSocketOpenCallbackResult;
import GeneralCallbackResult = UniNamespace.GeneralCallbackResult;
import OnSocketMessageCallbackResult = UniNamespace.OnSocketMessageCallbackResult;
import SendSocketMessageOptions = UniNamespace.SendSocketMessageOptions;
import CloseSocketOptions = UniNamespace.CloseSocketOptions;

/** @example `核心API`
 *  const SocketTask = uni.connectSocket({
 *   url: 'wss://www.example.com/socket',
 *   header: {
 *    'content-type': 'application/json'
 *  },
 *   protocols: ['protocol1'],
 *   method: 'GET'
 * });
 * */
export class ws<T> {
  instance: SocketTask;
  name: string;
  ready: boolean | undefined;

  constructor(
    options: ConnectSocketOption,
    name: string,
    onOpen: (res: OnSocketOpenCallbackResult) => void,
    onMessage?: (result: OnSocketMessageCallbackResult<T>) => void,
    onClose?: (res: any) => void,
    onError?: (err: GeneralCallbackResult) => void
  ) {
    this.name = name;
    this.instance = uni.connectSocket({
      ...options,
      success: () => {
        console.log("WebSocket 已初始化");
      },
      fail: (err) => {
        console.error("WebSocket 初始化失败:", err);
        this.ready = false;
      },
    });
    this.onOpen(onOpen);
    onClose && this.onClose(onClose);
    onError && this.onError(onError);
    onMessage && this.onMessage(onMessage);
  }

  onOpen(callback: (result: OnSocketOpenCallbackResult) => void) {
    this.instance.onOpen((res) => {
      console.log(`WebSocket<${this.name}> 连接已打开`);
      this.ready = true;
      return callback(res);
    });
  }

  onClose(callback: (result: any) => void) {
    this.instance.onClose((res) => {
      console.log(`WebSocket<${this.name}> 连接已关闭`);
      this.ready = false;
      return callback(res);
    });
  }

  onError(callback: (err: GeneralCallbackResult) => void) {
    this.instance.onError((err) => {
      console.log(`WebSocket<${this.name}> 连接出错`);
      this.ready = false;
      return callback(err);
    });
  }

  onMessage(callback: (result: OnSocketMessageCallbackResult<T>) => void) {
    this.instance.onMessage((res) => {
      console.log(`WebSocket<${this.name}> 接收消息：`, res.data);
      try {
        res.data = JSON.parse(res.data);
      } catch {
        console.log("消息格式错误！");
      }
      return callback(res);
    });
  }

  close(options: CloseSocketOptions) {
    this.instance.close(options);
  }

  sendMessage(options: SendSocketMessageOptions) {
    this.instance.send(options);
  }
}
