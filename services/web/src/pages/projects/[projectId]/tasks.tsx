import React from "react";
import Button from "@components/ui/button";
import type { NextPage } from "next";
import {
  addTask,
  FetchTaskListResponse,
  TaskAddModal,
  TaskAddModalFormValues,
  TaskList,
  taskStatus,
} from "@features/task";
import Form from "@components/ui/form";

// TODO: 静的なページを作成する
/**
 * 1. ~追加モーダル~
 * 2. ~タスク一覧~
 * 3. タスク詳細モーダル
 */

const mockTasks: FetchTaskListResponse["tasks"] = [
  {
    id: 1,
    title: "モックタスク1",
    status: "未着手",
  },
  {
    id: 2,
    title: "モックタスク2",
    status: "完了済み",
  },
  {
    id: 3,
    title: "モックタスク3",
    status: "進行中",
  },
];

type State = {
  tasks: FetchTaskListResponse["tasks"];
  isAddModalOpen: boolean;
};

const initialState: State = {
  // tasks: [],
  tasks: mockTasks,
  isAddModalOpen: false,
};

const Tasks: NextPage = () => {
  const [addForm] = Form.useForm<TaskAddModalFormValues>();
  const [tasks, setTasks] = React.useState(initialState.tasks);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(
    initialState.isAddModalOpen
  );

  React.useEffect(() => {
    (async () => {
      // const result = await fetchTasks();
      // setTasks(result.data.tasks);
    })().catch((error) => {
      console.error(error);
    });
  }, []);

  const handleAddModalFinish = async (values: TaskAddModalFormValues) => {
    console.log(values);

    try {
      const { dueDate, ...rest } = values;
      if (!dueDate) {
        throw new Error("期限が設定されていません");
      }

      const data = {
        ...rest,
        dueDate: dueDate.toDate(),
        status: taskStatus[0],
      };

      const result = await addTask(-1, data);
      console.log(result);

      addForm.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddModalCancel = () => {
    setIsAddModalOpen(initialState.isAddModalOpen);
    addForm.resetFields();
  };

  return (
    <>
      <div>
        <h1>タスクボード</h1>
        <div>
          <div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              新しいタスクの追加
            </Button>
          </div>
          {/* <div>オプション</div> */}
        </div>
        <div>
          <h2>タスク一覧</h2>
          <TaskList data={tasks} />
        </div>
      </div>
      <TaskAddModal
        form={addForm}
        open={isAddModalOpen}
        onFinish={handleAddModalFinish}
        onCancel={handleAddModalCancel}
      />
    </>
  );
};

export default Tasks;
