import type { NextPage } from "next";
import { PrivateRoute } from "@features/auth";
import { projectContext } from "@providers/project";
import Button from "@components/ui/button";
import List from "@components/ui/list";
import React from "react";
import {
  fetchSuggestionList,
  FetchSuggestionListResponse,
} from "@features/feature-suggestion";
import { isFetchError } from "@lib/fetch";
import message from "@components/ui/message";

type State = {
  suggestions: FetchSuggestionListResponse["suggestions"];
};

const initialState: State = {
  suggestions: [],
};

const useProject = () => React.useContext(projectContext);
const FeatureSuggestions: NextPage = () => {
  const project = useProject();

  const [suggestions, setSuggestions] = React.useState(
    initialState.suggestions
  );

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
              <List.Item.Meta title={item.title} />
              {/* statusによる切り替えー全体の横線 */}
              {/* approvalのチェックボックス */}
            </List.Item>
          )}
        />
      </div>
    </PrivateRoute>
  );
};

export default FeatureSuggestions;
