import React from "react";
import Form, { FormInstance } from "@components/ui/form";
import Modal, { ModalProps } from "@components/ui/modal";
import Input from "@components/ui/input";

export type RoomAddModalFormValues = {
  name: string;
};
type Props = Omit<ModalProps, "onOk" | "title"> & {
  form: FormInstance<RoomAddModalFormValues>;
  onFinish: (values: RoomAddModalFormValues) => void;
};

export const RoomAddModal: React.FC<Props> = (props) => {
  const { form, onFinish, ...rest } = props;

  return (
    <Modal title="新しいルームの作成" onOk={form.submit} {...rest}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="ルーム名"
          name="name"
          rules={[
            {
              required: true,
              message: "ルーム名を入力してください",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
