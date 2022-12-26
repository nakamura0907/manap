import type { NextPage } from "next";
import React from "react";
import {
  createRoom,
  fetchRoomList,
  FetchRoomListResponse,
  RoomAddModal,
  RoomAddModalFormValues,
  RoomList,
} from "@features/chat";
import { projectContext } from "@providers/project";
import { useRouter } from "next/router";
import Button from "@components/ui/button";
import Form from "@components/ui/form";

type State = {
  rooms: FetchRoomListResponse["rooms"];
  isModalOpen: boolean;
};

const initialState: State = {
  rooms: [],
  isModalOpen: false,
};

const useProject = () => React.useContext(projectContext);
const Rooms: NextPage = () => {
  const project = useProject();
  const router = useRouter();

  const [form] = Form.useForm<RoomAddModalFormValues>();
  const [rooms, setRooms] = React.useState(initialState.rooms);
  const [isModalOpen, setIsModalOpen] = React.useState(
    initialState.isModalOpen
  );

  React.useEffect(() => {
    (async () => {
      const projectId = project?.id;
      if (!projectId) return;

      const result = await fetchRoomList(projectId);
      setRooms(result.data.rooms);
    })().catch((error) => {
      console.error(error);
    });
  }, [project]);

  const handleFinish = async (values: RoomAddModalFormValues) => {
    try {
      const result = await createRoom(project!.id, {
        ...values,
      });

      form.resetFields();
      setIsModalOpen(initialState.isModalOpen);
      router.push(`/projects/${project!.id}/rooms/${result.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 新規ルーム作成モーダルを閉じる
   */
  const handleCancel = () => {
    setIsModalOpen(initialState.isModalOpen);
    form.resetFields();
  };

  if (!project) return <></>;
  return (
    <>
      <div>
        <h1>掲示板</h1>
        <div>
          <Button onClick={() => setIsModalOpen(true)}>
            新しいルームの作成
          </Button>
        </div>
        <div>
          <h2>ルーム一覧</h2>
          <RoomList data={rooms} projectId={project.id} />
        </div>
      </div>
      <RoomAddModal
        form={form}
        open={isModalOpen}
        onFinish={handleFinish}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Rooms;
