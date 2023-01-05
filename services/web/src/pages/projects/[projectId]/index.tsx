import type { NextPage } from "next";
import { FormButtonSpace } from "@components/ui/space";
import { isFetchError } from "@lib/fetch";
import { PrivateRoute } from "@features/auth";
import { projectContext, setProjectContext } from "@providers/project";
import { updateProject } from "@features/project";
import Button from "@components/ui/button";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import message from "@components/ui/message";
import React from "react";
import { checkPermission } from "@common/role";

type State = {
  isDescriptionEdit: boolean;
};

type FormValues = {
  description?: string;
};

const initialState: State = {
  isDescriptionEdit: false,
};

const useProject = () => React.useContext(projectContext);
const useSetProject = () => React.useContext(setProjectContext);
const ProjectPage: NextPage = () => {
  const project = useProject();
  const setProject = useSetProject();

  const [form] = Form.useForm<FormValues>();
  const [isDescriptionEdit, setIsDescriptionEdit] = React.useState(
    initialState.isDescriptionEdit
  );

  /**
   * プロジェクトの説明を更新する
   */
  const handleUpdate = async (values: FormValues) => {
    try {
      const value = values.description || "";
      await updateProject({
        query: {
          projectId: project!.id,
        },
        body: {
          description: value,
        },
      });
      setProject({
        ...project!,
        description: value,
      });
      message.success("プロジェクトの説明を更新しました");

      setIsDescriptionEdit(false);
    } catch (error) {
      console.error(error);
      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("プロジェクトの説明の更新に失敗しました");
      }
    }
  };

  /**
   * プロジェクトの説明の更新をキャンセルする
   **/
  const handleCancel = () => {
    setIsDescriptionEdit(false);
    form.resetFields();
  };

  return (
    <PrivateRoute>
      <h2>{project!.name}</h2>
      <div>
        {!isDescriptionEdit ? (
          <div
            onClick={() => {
              if (checkPermission(project!.roleId, "project:update")) {
                setIsDescriptionEdit(true);
              }
            }}
            className="p-5 rounded-md bg-slate-50"
          >
            {project!.description}
          </div>
        ) : (
          <Form
            form={form}
            initialValues={{
              description: project!.description,
            }}
            onFinish={handleUpdate}
          >
            <Form.Item name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <FormButtonSpace>
                <Button onClick={handleCancel}>キャンセル</Button>
                <Button type="primary" htmlType="submit">
                  プロジェクト説明の更新
                </Button>
              </FormButtonSpace>
            </Form.Item>
          </Form>
        )}
      </div>
    </PrivateRoute>
  );
};

export default ProjectPage;
