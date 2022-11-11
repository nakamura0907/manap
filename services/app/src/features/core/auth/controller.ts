import Exception from "@/util/exception/Exception";
import NickName from "./domain/value/Nickname";
import EmailAuthCredential from "./domain/model/EmailAuthCredential";
import { signToken } from "@/util/jwt";
import { NextFunction, Request, Response } from "express";
import { authRepository } from "@/container";

type AuthController = {
  /**
   * 新規ユーザー登録
   */
  signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  /**
   * JWTトークンを発行する
   */
  login: (req: Request, res: Response) => void;
};

const authController = (): AuthController => {
  const signup = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const { email, password, nickname } = req.body;

      const validatedNickname = NickName.create(nickname);
      const credential = EmailAuthCredential.create(email, password);

      // 重複確認
      const existUser = await authRepository.loginByEmail(credential.email);
      if (existUser)
        throw new Exception("既に登録されているメールアドレスです");

      // ユーザー登録
      await authRepository.signupByEmail(validatedNickname, credential);

      res.status(200).end();
    })().catch(next);
  };

  const login = (req: Request, res: Response) => {
    if (!req.user) throw new Exception("認証に失敗しました", 401);

    const token = signToken(req.user);
    res.status(200).send({ id: req.user.id, token });
  };

  return { signup, login };
};

export default authController;
