import type { NextPage } from "next";
import React from "react";
import { projectContext } from "@providers/project";
import { useRouter } from "next/router";
import { fetchRoomById, FetchRoomByIdResponse } from "@features/chat";
import PageHeader from "@components/ui/page-header";
import Button from "@components/ui/button";

type State = {
  room?: FetchRoomByIdResponse;
};

const initialState: State = {
  room: undefined,
};

const useProject = () => React.useContext(projectContext);
const ChatRoom: NextPage = () => {
  const project = useProject();
  const router = useRouter();

  const [room, setRoom] = React.useState(initialState.room);

  React.useEffect(() => {
    (async () => {
      const { roomId } = router.query;
      const projectId = project?.id;

      if (!roomId || !projectId) return;
      if (Array.isArray(roomId)) throw new Error("不正なルームIDです");

      // ルーム情報取得
      const result = await fetchRoomById(projectId, Number(roomId));
      setRoom(result.data);

      // Socket接続
      console.log(result.data);
    })().catch((error) => {
      console.log(error);
    });
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
