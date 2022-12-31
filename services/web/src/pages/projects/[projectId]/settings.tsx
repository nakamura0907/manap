import type { NextPage } from "next";
import Button from "@components/ui/button";
import Divider from "@components/ui/divider";
import message from "@components/ui/message";
import Modal from "@components/ui/modal";
import React from "react";
import { isFetchError } from "@lib/fetch";
import { PrivateRoute } from "@features/auth";
import { useRouter } from "next/router";
import { projectContext } from "@providers/project";
import { removeProject } from "@features/project";

type State = {
  isRemoveModalVisible: boolean;
};

const initialState: State = {
  isRemoveModalVisible: false,
};

const useProject = () => React.useContext(projectContext);
const ProjectSettings: NextPage = () => {
  const project = useProject();
  const router = useRouter();

  const [isRemoveModalVisible, setIsRemoveModalVisible] = React.useState(
    initialState.isRemoveModalVisible
  );

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
