import type Express from "express";
import passport from "@/features/core/auth/passport";
import projectController from "@/features/core/projects/controller";

export const projectsRouter = (express: typeof Express) => {
  const router = express.Router();

  const controller = projectController();

  router
    .route("/projects")
    .get(passport.authenticate("jwt", { session: false }), controller.fetchList)
    .post(passport.authenticate("jwt", { session: false }), controller.create);

  router
    .route("/projects/:id")
    .get(passport.authenticate("jwt", { session: false }), controller.fetchById)
    .put(passport.authenticate("jwt", { session: false }), controller.update)
    .delete(
      passport.authenticate("jwt", { session: false }),
      controller.remove
    );

  return router;
};
