import { parseCookies, setCookie } from "@lib/cookie";

export * from "./api/loginByEmail";
export * from "./api/verifyToken";

/**
 * Cookieにトークンを保存する
 */
export const setToken = (token: string) => {
  setCookie(null, "token", token);
};

export const fetchToken = (): string | undefined => {
  const cookies = parseCookies();
  return cookies.token;
};
