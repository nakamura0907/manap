import type Express from "express";
import passport from "@/features/core/auth/passport";
import projectController from "@/features/core/projects/controller";

export const projectsRouter = (express: typeof Express) => {
  const router = express.Router();

  const controller = projectController();

  // TODO: 一つにまとめる
  router.post(
    "/projects",
    passport.authenticate("jwt", { session: false }),
    controller.create
  );
  router.get(
    "/projects",
    passport.authenticate("jwt", { session: false }),
    controller.fetchList
  );
  // ここまで

  router.get(
    "/projects/:id",
    passport.authenticate("jwt", { session: false }),
    controller.fetchById
  );

  return router;
};
