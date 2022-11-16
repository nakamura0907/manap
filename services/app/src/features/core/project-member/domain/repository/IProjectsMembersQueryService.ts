import { GeneratedId } from "@/features/shared/Id";
import { MemberListDTO } from "../../query";

interface IProjectsMembersQueryService {
  fetchList(projectId: GeneratedId): Promise<MemberListDTO>;
}

export default IProjectsMembersQueryService;
