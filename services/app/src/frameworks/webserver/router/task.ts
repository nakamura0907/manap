import type Express from "express";
import taskController from "@/features/core/task/controller";
import passport from "@/features/core/auth/passport";

const basePrefix = "/tasks";
export const taskRouter = (express: typeof Express) => {
  const router = express.Router({ mergeParams: true });
  const controller = taskController();

  router
    .route(`${basePrefix}`)
    .post(passport.authenticate("jwt", { session: false }), controller.add)
    .get(
      passport.authenticate("jwt", { session: false }),
      controller.fetchList
    );

  router
    .route(`${basePrefix}/:taskId`)
    .get(passport.authenticate("jwt", { session: false }), controller.fetchById)
    .put(passport.authenticate("jwt", { session: false }), controller.update)
    .delete(
      passport.authenticate("jwt", { session: false }),
      controller.remove
    );

  return router;
};

export default taskRouter;
