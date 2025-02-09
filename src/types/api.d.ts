export interface ResponseData<T> {
  code: string;
  ok: boolean;
  msg: string;
  result: T;
}
export type UserProfile = {
  token: string;
  nickname: string;
  avatar: string;
};
export type LoginInfo = {
  code: string;
};
export type ReqLoginResponseData<T = { isFirst: boolean }> =
  T["isFirst"] extends true ? T & UserProfile : T & Partial<UserProfile>;
export type RegisterInfo = ExcludeInObject<UserProfile, "token"> & LoginInfo;
export type ReqRegisterResponseData = UserProfile;
/** TypeTools */

/** Exclude in object.
 *  @template T Object type
 *  @template U Exclude key
 * */
export type ExcludeInObject<T, U extends keyof T> = {
  [key in Exclude<keyof T, U>]: T[key];
};
