import Form, { FormInstance } from "@components/ui/form";
import Modal, { ModalProps } from "@components/ui/modal";

export type SuggestionAddModalFormValues = {};

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
      </Form>
    </Modal>
  );
};
