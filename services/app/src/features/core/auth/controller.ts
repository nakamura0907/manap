import Exception from "@/util/exception/Exception";
import { signToken } from "@/util/jwt";
import { Request, Response } from "express";

type AuthController = {
  /**
   * JWTトークンを発行する
   */
  login: (req: Request, res: Response) => void;
};

const authController = (): AuthController => {
  const login = (req: Request, res: Response) => {
    if (!req.user) throw new Exception("認証に失敗しました", 401);

    const token = signToken(req.user);
    res.status(200).send({ id: req.user.id, token });
  };

  return { login };
};

export default authController;
