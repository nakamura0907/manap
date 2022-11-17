import { GeneratedId } from "@/features/shared/Id";
import { MemberListDTO } from "../../query";

interface IProjectsMembersQueryService {
  fetchList(projectId: GeneratedId): Promise<MemberListDTO>;
  find(projectId: GeneratedId, userId: GeneratedId): Promise<boolean>;
  count(projectId: GeneratedId): Promise<number>;
}

export default IProjectsMembersQueryService;
