import React from "react";
import Form, { FormInstance } from "@components/ui/form";
import Modal, { ModalProps } from "@components/ui/modal";
import Input from "@components/ui/input";

export type ProjectCreateModalFormValues = {
  name: string;
  description?: string;
};

type Props = Omit<ModalProps, "onOk" | "title"> & {
  form: FormInstance<ProjectCreateModalFormValues>;
  onFinish: (values: ProjectCreateModalFormValues) => void;
};

export const ProjectCreateModal: React.FC<Props> = (props) => {
  const { form, onFinish, ...rest } = props;

  return (
    <Modal title="新しいプロジェクトの作成" onOk={form.submit} {...rest}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="プロジェクト名"
          name="name"
          rules={[
            {
              required: true,
              message: "プロジェクト名を入力してくだい",
              validateTrigger: "onOk",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="プロジェクトの説明" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
