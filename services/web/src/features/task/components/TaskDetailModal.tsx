import React from "react";
import Modal, { ModalProps } from "@components/ui/modal";
import { fetchTaskById, Task } from "@features/task";
import { loadingContext, setLoadingContext } from "@providers/loading";
import Button from "@components/ui/button";
import { projectContext } from "@providers/project";

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
const useProject = () => React.useContext(projectContext);
export const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { taskId, onTaskRemove, ...rest } = props;

  const isLoading = useIsLoading();
  const setLoading = useSetLoading();
  const project = useProject();
  const [task, setTask] = React.useState(initialValue.task);

  React.useEffect(() => {
    (async () => {
      const projectId = project?.id;
      if (!taskId || !projectId) return;

      const result = await fetchTaskById(projectId, taskId);
      setTask(result.data);
    })().catch((error) => {
      console.error(error);
    });
  }, [taskId, project]);

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
      <p>{new Date(task.due).toUTCString()}</p>

      <Button danger onClick={() => handleTaskRemove(task.id)}>
        タスクの削除
      </Button>
    </Modal>
  );
};
