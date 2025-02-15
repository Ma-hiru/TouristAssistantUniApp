/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_URL: string;
  readonly VITE_WS: string;
  readonly VITE_UPLOAD_AVATAR: string;
  readonly VITE_CARD_GENERATE: string;
}

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
