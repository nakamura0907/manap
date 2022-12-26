import Link from "@components/ui/link";
import List from "@components/ui/list";
import { FetchRoomListResponse } from "@features/chat/api/fetchRoomList";
import React from "react";

type RoomListProps = {
  data: FetchRoomListResponse["rooms"];
  projectId: number;
};

export const RoomList: React.FC<RoomListProps> = ({ data, projectId }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={
              <Link href={`/projects/${projectId}/rooms/${item.id}`}>
                {item.name}
              </Link>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default RoomList;
