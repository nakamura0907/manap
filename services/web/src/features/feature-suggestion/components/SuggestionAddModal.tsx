import Form, { FormInstance } from "@components/ui/form";
import Input from "@components/ui/input";
import Modal, { ModalProps } from "@components/ui/modal";

export type SuggestionAddModalFormValues = {
  title: string;
  description?: string;
};

type Props = Omit<ModalProps, "onOk" | "title"> & {
  form: FormInstance<SuggestionAddModalFormValues>;
  onFinish: (values: SuggestionAddModalFormValues) => void;
};

export const SuggestionAddModal = (props: Props) => {
  const { form, onFinish, ...rest } = props;

  return (
    <Modal title="新しい機能提案の追加" onOk={form.submit} {...rest}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="機能案"
          name="title"
          rules={[
            {
              required: true,
              message: "提案する機能を入力してください",
              validateTrigger: "onClick",
            },
          ]}
        >
          <Input placeholder="ユーザーのプロフィール画像を設定できるようにしてほしい" />
        </Form.Item>
        <Form.Item label="機能案の説明" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
