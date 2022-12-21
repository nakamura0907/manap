import type { NextPage } from "next";
import React from "react";
import { RoomList } from "@features/chat";
import { projectContext } from "@providers/project";

type State = {
  rooms: any[];
};

const initialState: State = {
  rooms: [],
};

const useProject = () => React.useContext(projectContext);
const Rooms: NextPage = () => {
  const project = useProject();

  const [rooms, setRooms] = React.useState(initialState.rooms);

  React.useEffect(() => {
    (async () => {
      const projectId = project?.id;
      if (!projectId) return;
    })().catch((error) => {
      console.error(error);
    });
  }, [project]);

  return (
    <>
      <div>
        <h1>掲示板</h1>
        {/* <div>
        <Button>新しいルームの作成</Button>
      </div> */}
        <div>
          <h2>ルーム一覧</h2>
          <RoomList data={rooms} />
        </div>
      </div>
    </>
  );
};

export default Rooms;
