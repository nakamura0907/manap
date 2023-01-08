import type { NextPage } from "next";
import {
  fetchMemberList,
  FetchMemberListResponse,
  Member,
  removeMember,
} from "@features/project-member";
import { authContext } from "@providers/auth";
import { checkPermission, getChangeableRoleIds } from "@common/role";
import { isFetchError } from "@lib/fetch";
import { PrivateRoute } from "@features/auth";
import { projectContext } from "@providers/project";
import Button from "@components/ui/button";
import List from "@components/ui/list";
import message from "@components/ui/message";
import Modal from "@components/ui/modal";
import React from "react";
import { FetchProjectByIdResponse } from "@common/api/projects";
import Select from "@components/ui/select";

type State = {
  members: FetchMemberListResponse["members"];
};

const initialState: State = {
  members: [],
};

const useAuth = () => React.useContext(authContext);
const useProject = () => React.useContext(projectContext);
const Members: NextPage = () => {
  const auth = useAuth();
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

  /**
   * メンバーを削除する
   */
  const handleRemove = (userId: number) => {
    Modal.confirm({
      title: "メンバーの削除",
      content: "メンバーを削除しますか？",
      onOk: async () => {
        try {
          await removeMember(project!.id, userId);

          setMembers(members.filter((member) => member.userId !== userId));
          message.success("メンバーを削除しました");
        } catch (error) {
          console.log(error);
          if (isFetchError(error) && error.response) {
            message.error(error.response.data.message);
          } else {
            message.error("メンバーの削除に失敗しました");
          }
        }
      },
    });
  };

  return (
    <PrivateRoute>
      <div>
        <h2>メンバー一覧</h2>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={members}
          header={
            <div className="flex">
              <Button className="ml-auto">新しいメンバーを追加する</Button>
            </div>
          }
          renderItem={(item) => (
            <List.Item key={item.userId}>
              <List.Item.Meta
                title={item.name}
                description={<MemberRole project={project!} member={item} />}
              />
              {checkPermission(project!.roleId, "member:remove", {
                targetRoleId: item.role.id,
              }) &&
                auth!.userId != item.userId && (
                  <Button danger onClick={() => handleRemove(item.userId)}>
                    削除する
                  </Button>
                )}
            </List.Item>
          )}
        />
      </div>
    </PrivateRoute>
  );
};

const MemberRole = ({
  project,
  member,
}: {
  project: FetchProjectByIdResponse;
  member: Member;
}) => {
  // メンバーの役割を変更できない場合
  if (
    !checkPermission(project.roleId, "member:add", {
      targetRoleId: member.role.id,
    })
  )
    return <>{member.role.name}</>;

  const changeableRoleIds = getChangeableRoleIds(project.roleId);
  if (changeableRoleIds.length === 0) return <>{member.role.name}</>;

  // TODO: セレクトボックスを作成する
  // セレクトボックスを表示する
  return <>{member.role.name}</>;
  return (
    <Select>
      <Select.Option value={member.role.id}>{member.role.name}</Select.Option>
    </Select>
  );
};

export default Members;
