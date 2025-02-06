export interface ResponseData<T> {
  code: string;
  msg: string;
  result: T;
}

export type loginInfo = {
  nickname?: string;
  avatar?: string;
  code: string;
};

export type userProfile = {
  token: string;
  nickname: string;
  avatar: string;
};
