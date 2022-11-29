import type Express from "express";
import passport from "@/features/core/auth/passport";
import suggestionController from "@/features/core/feature-suggestion/suggestion/controller";

const basePrefix = "/feature-suggestions";
export const featureSuggestionRouter = (express: typeof Express) => {
  const router = express.Router({ mergeParams: true });

  const controller = {
    suggestion: suggestionController(),
  };

  router
    .route(basePrefix)
    .post(
      passport.authenticate("jwt", { session: false }),
      controller.suggestion.add
    )
    .get(
      passport.authenticate("jwt", { session: false }),
      controller.suggestion.fetchList
    );
  router
    .route(`${basePrefix}/:suggestionId`)
    .get(
      passport.authenticate("jwt", { session: false }),
      controller.suggestion.fetchById
    )
    .put(
      passport.authenticate("jwt", { session: false }),
      controller.suggestion.update
    )
    .delete(
      passport.authenticate("jwt", { session: false }),
      controller.suggestion.remove
    );

  return router;
};

export default featureSuggestionRouter;
