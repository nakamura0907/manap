import Link from "@components/ui/link";
import List from "@components/ui/list";
import React from "react";

type RoomListItem = {
  id: number;
  name: string;
};

type RoomListProps = {
  data: RoomListItem[];
};

export const RoomList: React.FC<RoomListProps> = ({ data }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={<Link href={`/chats/${item.id}`}>{item.name}</Link>}
          />
        </List.Item>
      )}
    />
  );
};

export default RoomList;
