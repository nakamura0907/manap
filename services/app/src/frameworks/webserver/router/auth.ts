import type Express from "express";
import passport from "@/features/core/auth/passport";
import authController from "@/features/core/auth/controller";

export const authRouter = (express: typeof Express) => {
  const router = express.Router();

  const controller = authController();

  router.post(
    "/auth/login",
    passport.authenticate("local", {
      session: false,
    }),
    controller.login
  );

  return router;
};
