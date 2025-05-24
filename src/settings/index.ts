import * as theme from "./theme";
import * as api from "./api";
import * as app from "./app";

const AppConf = {
  ...app,
  ...theme,
  ...api,
};
export default AppConf;
