import type { NextPage } from "next";
import {
  addSuggestion,
  fetchSuggestionList,
  FetchSuggestionListResponse,
  SuggestionAddModal,
  SuggestionAddModalFormValues,
} from "@features/feature-suggestion";
import { checkPermission } from "@common/role";
import { isFetchError } from "@lib/fetch";
import { PrivateRoute } from "@features/auth";
import { projectContext } from "@providers/project";
import Button from "@components/ui/button";
import Checkbox from "@components/ui/checkbox";
import Form from "@components/ui/form";
import List from "@components/ui/list";
import message from "@components/ui/message";
import React from "react";

type State = {
  suggestions: FetchSuggestionListResponse["suggestions"];
  isOpen: {
    addModal: boolean;
    detailModal: boolean;
  };
};

const initialState: State = {
  suggestions: [],
  isOpen: {
    addModal: false,
    detailModal: false,
  },
};

const useProject = () => React.useContext(projectContext);
const FeatureSuggestions: NextPage = () => {
  const project = useProject();

  const [addForm] = Form.useForm<SuggestionAddModalFormValues>();
  const [suggestions, setSuggestions] = React.useState(
    initialState.suggestions
  );
  const [isOpen, setIsOpen] = React.useState(initialState.isOpen);

  React.useEffect(() => {
    (async () => {
      const response = await fetchSuggestionList(project!.id);

      setSuggestions(response.data.suggestions);
    })().catch((error) => {
      console.error(error);

      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("機能提案一覧の取得に失敗しました");
      }
    });
  }, [project]);

  /**
   * 新しい機能を提案する
   */
  const handleAddSuggestion = async (values: SuggestionAddModalFormValues) => {
    try {
      const response = await addSuggestion(project!.id, values);

      setSuggestions((prev) => [...prev, response.data]);
      setIsOpen({ ...isOpen, addModal: false });
      addForm.resetFields();
    } catch (error) {
      console.log(error);
      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("新しい機能の提案に失敗しました");
      }
    }
  };

  /**
   * 追加モーダルを閉じる
   */
  const handleCloseAddModal = () => {
    setIsOpen({ ...isOpen, addModal: false });
    addForm.resetFields();
  };

  return (
    <PrivateRoute>
      <div>
        <h2>機能提案一覧</h2>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={suggestions}
          header={
            <div>
              <Button
                onClick={() =>
                  setIsOpen({
                    ...isOpen,
                    addModal: true,
                  })
                }
                className="ml-auto"
              >
                新しい機能を提案する
              </Button>
            </div>
          }
          renderItem={(item) => (
            <List.Item key={item.id} className={"cursor-pointer"}>
              <List.Item.Meta
                title={
                  <span
                    className={item.status ? "line-through text-gray-400" : ""}
                  >
                    {item.title}
                  </span>
                }
              />
              <Checkbox
                checked={item.clientApproval}
                disabled={
                  !checkPermission(
                    project!.roleId,
                    "feature-suggestion:update",
                    {
                      clientApproval: true,
                    }
                  )
                }
              >
                クライアント承認
              </Checkbox>
              <Checkbox
                checked={item.vendorApproval}
                disabled={
                  !checkPermission(
                    project!.roleId,
                    "feature-suggestion:update",
                    {
                      vendorApproval: true,
                    }
                  )
                }
              >
                ベンダー承認
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
      <SuggestionAddModal
        form={addForm}
        open={isOpen.addModal}
        onFinish={handleAddSuggestion}
        onCancel={handleCloseAddModal}
      />
    </PrivateRoute>
  );
};

export default FeatureSuggestions;
