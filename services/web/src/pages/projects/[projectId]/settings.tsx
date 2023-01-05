import type { NextPage } from "next";
import { isFetchError } from "@lib/fetch";
import { PrivateRoute } from "@features/auth";
import { projectContext, setProjectContext } from "@providers/project";
import { removeProject, updateProject } from "@features/project";
import { useRouter } from "next/router";
import Button from "@components/ui/button";
import Divider from "@components/ui/divider";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import message from "@components/ui/message";
import Modal from "@components/ui/modal";
import React from "react";

type State = {
  isRemoveModalVisible: boolean;
};

type FormValues = {
  name: string;
};

const initialState: State = {
  isRemoveModalVisible: false,
};

const useProject = () => React.useContext(projectContext);
const useSetProject = () => React.useContext(setProjectContext);
const ProjectSettings: NextPage = () => {
  const project = useProject();
  const setProject = useSetProject();
  const router = useRouter();

  const [form] = Form.useForm<FormValues>();
  const [isRemoveModalVisible, setIsRemoveModalVisible] = React.useState(
    initialState.isRemoveModalVisible
  );

  /**
   * プロジェクト名を更新する
   */
  const handleUpdateProjectName = async (values: FormValues) => {
    try {
      await updateProject({
        query: {
          projectId: project!.id,
        },
        body: {
          name: values.name,
        },
      });
      setProject({
        ...project!,
        name: values.name,
      });
      message.success("プロジェクト名を更新しました");
    } catch (error) {
      console.error(error);
      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("プロジェクト名の更新に失敗しました");
      }
    }
  };

  /**
   * プロジェクトを削除する
   */
  const handleRemove = async () => {
    try {
      await removeProject(project!.id);
      router.replace("/mypage");
    } catch (error) {
      console.error(error);
      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("プロジェクトの削除に失敗しました");
      }
    }
  };

  return (
    <PrivateRoute>
      <h2>プロジェクト設定</h2>
      <div>
        <h3>プロジェクト名</h3>
        <Form form={form} onFinish={handleUpdateProjectName} layout="inline">
          <Form.Item
            name="name"
            initialValue={project?.name}
            rules={[
              {
                required: true,
                message: "プロジェクト名を入力してください",
                validateTrigger: "onClick",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">プロジェクト名の更新</Button>
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div>
        <h3>プロジェクトの削除</h3>
        <Button
          danger
          className="block ml-auto"
          onClick={() => setIsRemoveModalVisible(true)}
        >
          プロジェクトを削除する
        </Button>
      </div>
      <Modal
        title="プロジェクトを削除しますか？"
        open={isRemoveModalVisible}
        onOk={handleRemove}
        onCancel={() => setIsRemoveModalVisible(false)}
      >
        <p>
          プロジェクトを削除すると、プロジェクトに紐づく全てのデータが削除されます。
        </p>
        <p>本当に削除しますか？</p>
      </Modal>
    </PrivateRoute>
  );
};

export default ProjectSettings;
