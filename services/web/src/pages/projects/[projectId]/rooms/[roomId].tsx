import type { NextPage } from "next";
import React from "react";
import { projectContext } from "@providers/project";
import { useRouter } from "next/router";
import { fetchRoomById, FetchRoomByIdResponse } from "@features/chat";
import PageHeader from "@components/ui/page-header";
import Button from "@components/ui/button";
import { io } from "socket.io-client";
import { authContext } from "@providers/auth";

type State = {
  room?: FetchRoomByIdResponse;
};

const initialState: State = {
  room: undefined,
};

const socket = io("http://localhost:3001"); // TODO: 可能ならfeaturesに移動させる
const useAuth = () => React.useContext(authContext);
const useProject = () => React.useContext(projectContext);
const ChatRoom: NextPage = () => {
  const auth = useAuth();
  const project = useProject();
  const router = useRouter();

  const [room, setRoom] = React.useState(initialState.room);

  React.useEffect(() => {
    (async () => {
      const { roomId } = router.query;
      const projectId = project?.id;
      const userId = auth?.userId;

      if (!roomId || !projectId || !userId) return;
      if (Array.isArray(roomId)) throw new Error("不正なルームIDです");

      // ルーム情報取得
      const result = await fetchRoomById(projectId, Number(roomId));
      setRoom(result.data);

      // Socket接続
      // TODO: 動作確認
      socket.on("connect", () => console.log(`socket connected`));
      socket.emit("join", {
        roomId,
        userId,
      });
    })().catch((error) => {
      console.log(error);
    });

    return () => {
      socket.off("connect");
      socket.off("join");
    };
  }, [project]);

  if (!room) return <></>;
  return (
    <>
      <PageHeader
        title={room.name}
        onBack={() => router.back()}
        extra={[<Button key={1}>編集</Button>]}
      />
      <div>chat list</div>
      <div>form</div>
    </>
  );
};

export default ChatRoom;
