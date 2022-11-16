import { GeneratedId } from "@/features/shared/Id";

interface IProjectsMembersRepository {
  remove(projectId: GeneratedId, targetUserId: GeneratedId): Promise<void>;
}

export default IProjectsMembersRepository;
