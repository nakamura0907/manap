import type { NextPage } from "next";
import React from "react";
import Button from "@components/ui/button";
import {
  addTask,
  fetchTaskList,
  FetchTaskListResponse,
  removeTask,
  TaskAddModal,
  TaskAddModalFormValues,
  TaskDetailModal,
  TaskList,
  taskStatus,
} from "@features/task";
import Form from "@components/ui/form";
import { projectContext } from "@providers/project";

type State = {
  tasks: FetchTaskListResponse["tasks"];
  isAddModalOpen: boolean;
  isDetailModalOpen?: number;
};

const initialState: State = {
  tasks: [],
  isAddModalOpen: false,
  isDetailModalOpen: undefined,
};

const useProject = () => React.useContext(projectContext);
const Tasks: NextPage = () => {
  const project = useProject();

  const [addForm] = Form.useForm<TaskAddModalFormValues>();
  const [tasks, setTasks] = React.useState(initialState.tasks);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(
    initialState.isAddModalOpen
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(
    initialState.isDetailModalOpen
  );

  React.useEffect(() => {
    (async () => {
      const projectId = project?.id;
      if (!projectId) return;

      const result = await fetchTaskList(projectId);
      setTasks(result.data.tasks);
    })().catch((error) => {
      console.error(error);
    });
  }, [project]);

  /**
   * 新規タスクの追加
   *
   * 新規タスク追加モーダルのフォームから発火
   * apiを叩いてタスクを追加する
   */
  const handleAddTask = async (values: TaskAddModalFormValues) => {
    console.log(values);

    try {
      const { due, ...rest } = values;
      if (!due) {
        throw new Error("期限が設定されていません");
      }

      const data = {
        ...rest,
        due: due.toDate(),
        status: taskStatus[0],
      };

      const result = await addTask(project!.id, data);
      console.log(result);

      setTasks([...tasks, result.data]);
      addForm.resetFields();
      setIsAddModalOpen(initialState.isAddModalOpen);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * タスクの削除
   */
  const handleRemoveTask = async (id: number) => {
    try {
      await removeTask(project!.id, id);
      setTasks(tasks.filter((task) => task.id !== id));
      setIsDetailModalOpen(initialState.isDetailModalOpen);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 新規タスク追加モーダルを閉じる
   */
  const handleCloseAddModal = () => {
    setIsAddModalOpen(initialState.isAddModalOpen);
    addForm.resetFields();
  };

  /**
   *  タスク詳細モーダルを閉じる
   */
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(initialState.isDetailModalOpen);
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
          <TaskList data={tasks} onClick={setIsDetailModalOpen} />
        </div>
      </div>
      <TaskAddModal
        form={addForm}
        open={isAddModalOpen}
        onFinish={handleAddTask}
        onCancel={handleCloseAddModal}
      />
      <TaskDetailModal
        taskId={isDetailModalOpen}
        onCancel={handleCloseDetailModal}
        onTaskRemove={handleRemoveTask}
      />
    </>
  );
};

export default Tasks;
