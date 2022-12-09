import React from "react";
import Button from "@components/ui/button";
import type { NextPage } from "next";
import {
  addTask,
  TaskAddModal,
  TaskAddModalFormValues,
  taskStatus,
} from "@features/task";
import Form from "@components/ui/form";

// TODO: 静的なページを作成する
/**
 * 1. ~追加モーダル~
 * 2. タスク一覧
 * 3. タスク詳細モーダル
 */

type State = {
  isAddModalOpen: boolean;
};

const initialState: State = {
  isAddModalOpen: false,
};

const Tasks: NextPage = () => {
  const [addForm] = Form.useForm<TaskAddModalFormValues>();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(
    initialState.isAddModalOpen
  );

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
        <div>タスク一覧</div>
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
