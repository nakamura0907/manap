import { NextApiRequest, NextApiResponse, NextPageContext } from "next/types";
import {
  setCookie as nSetCookie,
  parseCookies as nParseCookies,
  destroyCookie as nDestroyCookie,
} from "nookies";

type SetCookieContext =
  | Pick<NextPageContext, "res">
  | {
      res: NextApiResponse<any>;
    }
  | null
  | undefined;

/**
 * Cookieの設定
 * クライアントサイド
 * @param ctx
 * @param name
 * @param value
 * @param options
 */
export const setCookie = (
  ctx: SetCookieContext,
  name: string,
  value: string,
  options?: any
) => {
  nSetCookie(ctx, name, value, options);
};

type ParseCookiesContext =
  | Pick<NextPageContext, "req">
  | {
      req: NextApiRequest;
    }
  | null
  | undefined;
/**
 * Cookieの取得
 * クライアントサイド
 * @param ctx
 * @returns
 */
export const parseCookies = (ctx?: ParseCookiesContext) => {
  return nParseCookies(ctx);
};

type DestroyCookieContext =
  | Pick<NextPageContext, "res">
  | {
      res: NextApiResponse<any>;
    }
  | null
  | undefined;
/**
 * Cookieの削除
 * クライアントサイド
 * @param context
 * @param name
 * @param options
 */
export const destroyCookie = (
  context: DestroyCookieContext,
  name: string,
  options?: any
) => {
  nDestroyCookie(context, name, options);
};
