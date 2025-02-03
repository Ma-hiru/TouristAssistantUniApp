declare export const useTowxml = (str: string, type: "markdown" | "html", option?: {
  base?: string;
  theme?: string | "light" | "dark";
  events?: {
    [k: string]: (e:any) => void;
  };
  [k: string]: any;
}) => any;
