import type { NextPage } from "next";
import {
  fetchMemberList,
  FetchMemberListResponse,
} from "@features/project-member";
import { isFetchError } from "@lib/fetch";
import { PrivateRoute } from "@features/auth";
import { projectContext } from "@providers/project";
import List from "@components/ui/list";
import message from "@components/ui/message";
import React from "react";

type State = {
  members: FetchMemberListResponse["members"];
};

const initialState: State = {
  members: [],
};

const useProject = () => React.useContext(projectContext);
const Members: NextPage = () => {
  const project = useProject();

  const [members, setMembers] = React.useState(initialState.members);

  React.useEffect(() => {
    (async () => {
      const response = await fetchMemberList(project!.id);

      setMembers(response.data.members);
    })().catch((error) => {
      console.error(error);

      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("メンバー一覧の取得に失敗しました");
      }
    });
  }, [project]);

  return (
    <PrivateRoute>
      <div>
        <h2>メンバー一覧</h2>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={members}
          renderItem={(item) => (
            <List.Item key={item.userId}>
              <List.Item.Meta title={item.name} description={item.role.name} />
            </List.Item>
          )}
        />
      </div>
    </PrivateRoute>
  );
};

export default Members;
