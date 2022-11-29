import { GeneratedId } from "@/features/shared/Id";
import { ProjectMemberRoleList } from "../../query";

interface IRolesRepository {
  /**
   * プロジェクトに所属しているメンバーの権限IDを取得する
   *
   * @throws {Exception} プロジェクトに所属していない場合
   */
  fetchRoleId(projectId: GeneratedId, userId: number): Promise<number>;
  fetchRoleList(projectId: GeneratedId): Promise<ProjectMemberRoleList>;
}

export default IRolesRepository;
