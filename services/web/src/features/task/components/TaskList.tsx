import React from "react";
import List from "@components/ui/list";
import { FetchTaskListResponse } from "@features/task/api/fetchTaskList";

type TaskListProps = {
  data: FetchTaskListResponse["tasks"];
};

export const TaskList: React.FC<TaskListProps> = ({ data }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id} className="cursor-pointer">
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
