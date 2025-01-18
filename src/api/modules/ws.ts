import ConnectSocketOption = UniNamespace.ConnectSocketOption;
import SocketTask = UniNamespace.SocketTask;
import OnSocketOpenCallbackResult = UniNamespace.OnSocketOpenCallbackResult;
import GeneralCallbackResult = UniNamespace.GeneralCallbackResult;
import OnSocketMessageCallbackResult = UniNamespace.OnSocketMessageCallbackResult;
import SendSocketMessageOptions = UniNamespace.SendSocketMessageOptions;
import { reqURL } from "@/api";

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
export class ws {
  instance: SocketTask;
  name: string;

  constructor(options: ConnectSocketOption, name: string) {
    options.url = reqURL + options.url;
    this.name = name;
    this.instance = uni.connectSocket({
      ...options,
      success: () => {
        console.log("WebSocket 连接已初始化");
      },
      fail: (err) => {
        console.error("WebSocket 连接初始化失败:", err);
      },
    });
  }

  onOpen(callback: (result: OnSocketOpenCallbackResult) => void) {
    this.instance.onOpen((res) => {
      console.log(`WebSocket<${this.name}> 连接已打开`);
      return callback(res);
    });
  }

  onClose(callback: (result: any) => void) {
    this.instance.onClose((res) => {
      console.log(`WebSocket<${this.name}> 连接已关闭`);
      return callback(res);
    });
  }

  onError(callback: (err: GeneralCallbackResult) => void) {
    this.instance.onError((err) => {
      console.log(`WebSocket<${this.name}> 连接出错`);
      return callback(err);
    });
  }

  onMessage(callback: <T>(result: OnSocketMessageCallbackResult<T>) => void) {
    this.instance.onMessage((res) => {
      console.log(`WebSocket<${this.name}> 接收消息：`, res.data);
      return callback(res);
    });
  }

  sendMessage(options: SendSocketMessageOptions) {
    this.instance.send(options);
  }
}
