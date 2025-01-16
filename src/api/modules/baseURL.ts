enum URL {
  productURL = "https://shiina-mahiru.cn",
  productWsURL = "wss://shiina-mahiru.cn",
  devURL = "http://127.0.0.1",
  devWsURL = "ws://127.0.0.1",
}

type envURL = {
  reqURL: string;
  wsURL: string;
};

function changeEnv(mode: "pro" | "dev"): envURL {
  const result: envURL = {
    reqURL: "",
    wsURL: "",
  };
  switch (mode) {
    case "pro":
      result.reqURL = URL.productURL + ":4000";
      result.wsURL = URL.productWsURL + ":4000/ws";
      break;
    case "dev":
      result.reqURL = URL.devURL + ":4000";
      result.wsURL = URL.devWsURL + ":4000/ws";
  }
  return result;
}

const URLs = changeEnv("dev");
export const reqURL = URLs.reqURL;
export const wsURL = URLs.wsURL;
