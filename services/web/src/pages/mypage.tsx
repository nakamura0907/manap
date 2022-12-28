import type { NextPage } from "next";
import Button from "@components/ui/button";
import Form from "@components/ui/form";
import Link from "@components/ui/link";
import List from "@components/ui/list";
import message from "@components/ui/message";
import React from "react";
import {
  createProject,
  fetchList,
  FetchListResponse,
  ProjectCreateModal,
  ProjectCreateModalFormValues,
} from "@features/project";
import { isFetchError } from "@lib/fetch";
import { useRouter } from "next/router";

type State = {
  isOpen: boolean;
  projects: FetchListResponse["projects"];
};

const initialState: State = {
  isOpen: false,
  projects: [],
};

const MyPage: NextPage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(initialState.isOpen);
  const [projects, setProjects] = React.useState(initialState.projects);

  const [form] = Form.useForm<ProjectCreateModalFormValues>();

  React.useEffect(() => {
    (async () => {
      const result = await fetchList();

      setProjects(result.data.projects);
    })().catch((error) => {
      console.error(error);

      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("プロジェクト一覧の取得に失敗しました");
      }
    });
  }, []);

  /**
   * 新規プロジェクトの作成
   */
  const handleCreateProject = async (values: ProjectCreateModalFormValues) => {
    try {
      const result = await createProject(values);

      router.push(`/projects/${result.data.id}`);
    } catch (error) {
      console.log(error);
      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("プロジェクトの作成に失敗しました");
      }
    }
  };

  /**
   * プロジェクト作成モーダルを閉じる
   */
  const handleCloseModal = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <div>
        <h2>マイページ</h2>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={projects}
          header={
            <div className="flex">
              <Button onClick={() => setIsOpen(true)} className="ml-auto">
                新しいプロジェクトの作成
              </Button>
            </div>
          }
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<Link href={`/projects/${item.id}`}>{item.name}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
      <ProjectCreateModal
        form={form}
        onCancel={handleCloseModal}
        onFinish={handleCreateProject}
        open={isOpen}
      />
    </div>
  );
};

export default MyPage;
