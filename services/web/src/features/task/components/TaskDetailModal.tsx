import React from "react";
import Modal, { ModalProps } from "@components/ui/modal";
import { Task } from "@features/task";
import { loadingContext, setLoadingContext } from "@providers/loading";
import Button from "@components/ui/button";

type TaskDetailModalProps = Omit<ModalProps, "title"> & {
  taskId?: number;
  onTaskRemove: (id: number) => void;
};

type State = {
  task?: Task;
};

const initialValue: State = {
  task: undefined,
};

const useIsLoading = () => React.useContext(loadingContext);
const useSetLoading = () => React.useContext(setLoadingContext);
export const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { taskId, onTaskRemove, ...rest } = props;

  const isLoading = useIsLoading();
  const setLoading = useSetLoading();
  const [task, setTask] = React.useState(initialValue.task);

  React.useEffect(() => {
    (async () => {
      if (!taskId) return;

      setTask({
        id: taskId,
        title: "モックタスク名",
        priority: "低",
        status: "未着手",
        due: new Date(),
      });
    })().catch((error) => {
      console.error(error);
    });
  }, [taskId]);

  React.useEffect(() => {
    if (!taskId) {
      setTask(initialValue.task);
    }
  }, [taskId, task]);

  const handleTaskRemove = (id: number) => {
    onTaskRemove(id);
  };

  // ローディング表示

  if (!task) return null;
  return (
    <Modal title={task.title} open={true} {...rest}>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{task.priority}</p>
      <p>{task.due.getUTCDate()}</p>

      <Button danger onClick={() => handleTaskRemove(task.id)}>
        タスクの削除
      </Button>
    </Modal>
  );
};
