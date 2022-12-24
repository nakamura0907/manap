import type { NextPage } from "next";
import React from "react";
import { projectContext } from "@providers/project";
import { useRouter } from "next/router";
import { fetchRoomById, FetchRoomByIdResponse } from "@features/chat";
import PageHeader from "@components/ui/page-header";
import Button from "@components/ui/button";
import { io } from "socket.io-client";
import { authContext } from "@providers/auth";
import Form from "@components/ui/form";
import Input from "@components/ui/input";

type State = {
  room?: FetchRoomByIdResponse;
};

type FormValues = {
  body: string;
};

const initialState: State = {
  room: undefined,
};

const socket = io("http://localhost:3001");
const useAuth = () => React.useContext(authContext);
const useProject = () => React.useContext(projectContext);

const ChatRoom: NextPage = () => {
  const auth = useAuth();
  const project = useProject();
  const router = useRouter();

  const [form] = Form.useForm<FormValues>();
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
      socket.on("connect", () => console.log(`socket connected`));
      socket.on("init", (data) => console.log(data));
      socket.emit("join", {
        roomId,
        userId,
      });
      socket.on("comment", (data) => console.log(data));
    })().catch((error) => {
      console.log(error);
    });

    return () => {
      socket.off("connect");
      socket.off("init");
      socket.off("join");
      socket.off("comment");
    };
  }, [project]);

  const handleFinish = (values: FormValues) => {
    socket.emit("comment", values);
  };

  if (!room) return <></>;
  return (
    <>
      <PageHeader
        title={room.name}
        onBack={() => router.back()}
        extra={[<Button key={1}>編集</Button>]}
      />
      <div>chat list</div>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="body"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            送信
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChatRoom;
