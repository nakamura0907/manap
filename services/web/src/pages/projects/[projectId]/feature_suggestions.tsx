import type { NextPage } from "next";
import {
  fetchSuggestionList,
  FetchSuggestionListResponse,
} from "@features/feature-suggestion";
import { isFetchError } from "@lib/fetch";
import { PrivateRoute } from "@features/auth";
import { projectContext } from "@providers/project";
import Button from "@components/ui/button";
import List from "@components/ui/list";
import message from "@components/ui/message";
import React from "react";
import Checkbox from "@components/ui/checkbox";
import { checkPermission } from "@common/role";

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
              <Button className="ml-auto">新しい機能を提案する</Button>
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
    </PrivateRoute>
  );
};

export default FeatureSuggestions;
