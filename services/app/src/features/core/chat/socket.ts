import { Server } from "socket.io";

type JoinEventData = {
  userId: number;
  roomId: string;
};

type CommentEventData = {
  body: string;
};

const chatSocketEvents = (io: Server) => {
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
        console.log(data);

        // ルーム参加
        userId = data.userId;
        roomId = data.roomId;
        socket.join(roomId);

        // ルーム初期化
        io.to(roomId).emit("init", {
          comments: [],
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
        console.log("コメント保存");
        console.log(`userId: ${userId}, roomId: ${roomId}`);
        console.log(`data: ${data}`);

        // レスポンス
        io.to(roomId).emit("comment", {});
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
