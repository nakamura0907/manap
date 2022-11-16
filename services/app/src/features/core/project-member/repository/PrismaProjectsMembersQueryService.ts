import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import { MemberListDTO } from "../query";
import Exception from "@/util/exception/Exception";
import IProjectsMembersQueryService from "../domain/repository/IProjectsMembersQueryService";

class PrismaProjectsMembersQueryService
  implements IProjectsMembersQueryService
{
  async fetchList(projectId: GeneratedId) {
    const result = await prisma.projects.findFirst({
      where: {
        id: projectId.value,
        delete_flag: false,
      },
      include: {
        projects_members: {
          where: {
            delete_flag: false,
          },
          include: {
            users: true,
            roles: true,
          },
        },
      },
    });
    if (!result) throw new Exception("プロジェクトが存在しません", 404);

    const members = result.projects_members.map((member) => {
      return {
        userId: member.user_id,
        name: member.users.nickname,
        role: {
          id: member.roles.id,
          name: member.roles.name,
        },
      };
    });
    return new MemberListDTO(members);
  }
}

export default PrismaProjectsMembersQueryService;
