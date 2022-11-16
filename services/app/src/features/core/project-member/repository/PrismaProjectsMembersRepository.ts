import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import IProjectsMembersRepository from "../domain/repository/IProjectsMembersRepository";

class PrismaProjectsMembersRepository implements IProjectsMembersRepository {
  async remove(projectId: GeneratedId, targetUserId: GeneratedId) {
    await prisma.projects_members.update({
      where: {
        project_id_user_id: {
          project_id: projectId.value,
          user_id: targetUserId.value,
        },
      },
      data: {
        delete_flag: true,
      },
    });
  }
}

export default PrismaProjectsMembersRepository;
