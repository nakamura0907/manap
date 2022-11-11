import type Express from "express";
import passport from "@/features/core/auth/passport";
import authController from "@/features/core/auth/controller";

export const authRouter = (express: typeof Express) => {
  const router = express.Router();

  const controller = authController();

  router.post("/auth/signup", controller.signup);

  router.post(
    "/auth/login",
    passport.authenticate("local", {
      session: false,
      scope: ["user:email"],
    }),
    controller.login
  );

  router.get(
    "/auth/github",
    passport.authenticate("github", { session: false })
  );
  router.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    controller.login
  );

  return router;
};
