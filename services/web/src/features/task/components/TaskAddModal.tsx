import DatePicker, {
  DatePickerProps,
  disabledDate,
} from "@components/ui/date-picker";
import Form, { FormInstance } from "@components/ui/form";
import Input from "@components/ui/input";
import Modal, { ModalProps } from "@components/ui/modal";
import Select from "@components/ui/select";
import { TaskPriority, taskPriority } from "@features/task/types";

export type TaskAddModalFormValues = {
  title: string;
  description?: string;
  dueDate: DatePickerProps["value"];
  priority: TaskPriority;
};
type TaskAddModalProps = Omit<ModalProps, "onOk" | "title"> & {
  form: FormInstance<TaskAddModalFormValues>;
  onFinish: (values: TaskAddModalFormValues) => void;
};

export const TaskAddModal = (props: TaskAddModalProps) => {
  const { form, onFinish, ...rest } = props;

  return (
    <Modal title="新しいタスクの追加" onOk={form.submit} {...rest}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="タスク名"
          name="title"
          rules={[
            {
              required: true,
              message: "タスク名を入力してください",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="タスクの説明" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="期限"
          name="dueDate"
          rules={[
            {
              required: true,
              message: "期限を入力してください",
            },
          ]}
        >
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          label="優先度"
          name="priority"
          initialValue={taskPriority[0]}
        >
          <Select
            options={[
              {
                label: taskPriority[0],
                value: taskPriority[0],
              },
              {
                label: taskPriority[1],
                value: taskPriority[1],
              },
              {
                label: taskPriority[2],
                value: taskPriority[2],
              },
              {
                label: taskPriority[3],
                value: taskPriority[3],
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
