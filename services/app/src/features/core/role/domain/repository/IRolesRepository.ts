import { GeneratedId } from "@/features/shared/Id";
import { ProjectMemberRoleList } from "../../query";

interface IRolesRepository {
  fetchRoleId(projectId: GeneratedId, userId: number): Promise<number>;
  fetchRoleList(projectId: GeneratedId): Promise<ProjectMemberRoleList>;
}

export default IRolesRepository;
