import type Express from "express";
import passport from "@/features/core/auth/passport";
import projectMemberController from "@/features/core/project-member/controller";

export const projectMemberRouter = (express: typeof Express) => {
  const router = express.Router({ mergeParams: true });

  const controller = projectMemberController();

  router
    .route("/members")
    .post(passport.authenticate("jwt", { session: false }), controller.add)
    .get(
      passport.authenticate("jwt", { session: false }),
      controller.fetchList
    );

  router
    .route("/members/:userId")
    .put(passport.authenticate("jwt", { session: false }), controller.update)
    .delete(
      passport.authenticate("jwt", { session: false }),
      controller.remove
    );

  return router;
};

export default projectMemberRouter;
