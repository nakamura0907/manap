import chatCommentController from "@/features/core/chat/comment/controller";
import { Server } from "socket.io";

type JoinEventData = {
  userId: number;
  roomId: string;
};

type CommentEventData = {
  body: string;
};

const chatSocketEvents = (io: Server) => {
  const controller = chatCommentController();

  io.on("connection", (socket) => {
    console.log(`a user connected: ${socket.id}`);
    let userId: number;
    let roomId: string;

    /**
     * ルームへの参加
     */
    socket.on("join", async (data: JoinEventData) => {
      try {
        // コメント取得
        const result = await controller.fetchList(data.roomId, data.userId);

        // ルーム参加
        userId = data.userId;
        roomId = data.roomId;
        socket.join(roomId);

        // ルーム初期化
        io.to(roomId).emit("init", {
          comments: result.comments,
        });
      } catch (error) {
        console.error(error);
        socket.emit("error", {
          message: "ルームに参加できませんでした",
        });
      }
    });

    /**
     * コメントの送信
     */
    socket.on("comment", async (data: CommentEventData) => {
      try {
        // コメント保存
        const result = await controller.add(roomId, userId, data);

        // レスポンス
        io.to(roomId).emit("comment", result);
      } catch (error) {
        console.error(error);
        socket.emit("error", {
          message: "コメントを保存できませんでした",
        });
      }
    });
  });
};

export default chatSocketEvents;
