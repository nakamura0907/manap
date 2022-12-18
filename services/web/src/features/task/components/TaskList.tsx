import React from "react";
import List from "@components/ui/list";
import { FetchTaskListResponse } from "@features/task/api/fetchTaskList";

type TaskListProps = {
  data: FetchTaskListResponse["tasks"];
  onClick: (id: number) => void;
};

export const TaskList: React.FC<TaskListProps> = ({ data, onClick }) => {
  const handleClick = (id: number) => {
    onClick(id);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          className="cursor-pointer"
          onClick={() => handleClick(item.id)}
        >
          <List.Item.Meta
            title={
              <span
                className={
                  item.status === "完了済み" ? "text-gray-400 line-through" : ""
                }
              >
                {item.title}
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
};
