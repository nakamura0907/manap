import type Express from "express";
import chatRoomController from "@/features/core/chat/room/controller";
import passport from "@/features/core/auth/passport";

const basePrefix = "/chats/rooms";
export const chatRouter = (express: typeof Express) => {
  const router = express.Router({ mergeParams: true });

  const controller = {
    rooms: chatRoomController(),
  };

  router
    .route(`${basePrefix}`)
    .post(
      passport.authenticate("jwt", { session: false }),
      controller.rooms.create
    )
    .get(
      passport.authenticate("jwt", { session: false }),
      controller.rooms.fetchList
    );
  router
    .route(`${basePrefix}/:roomId`)
    .get(
      passport.authenticate("jwt", { session: false }),
      controller.rooms.fetchById
    )
    .put(
      passport.authenticate("jwt", { session: false }),
      controller.rooms.update
    )
    .delete(
      passport.authenticate("jwt", { session: false }),
      controller.rooms.remove
    );

  return router;
};

export default chatRouter;
