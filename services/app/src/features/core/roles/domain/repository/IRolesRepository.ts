import { GeneratedId } from "@/features/shared/Id";

interface IRolesRepository {
  fetchRoleId(projectId: GeneratedId, userId: number): Promise<number>;
}

export default IRolesRepository;
