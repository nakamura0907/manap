import Member from "../model/Member";
import { GeneratedId } from "@/features/shared/Id";

interface IProjectsMembersRepository {
  add(member: Member): Promise<void>;
  remove(projectId: GeneratedId, targetUserId: GeneratedId): Promise<void>;
}

export default IProjectsMembersRepository;
