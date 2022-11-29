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
          orderBy: {
            roles: {
              weight: "asc",
            },
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

  async find(projectId: GeneratedId, userId: GeneratedId) {
    const result = await prisma.projects_members.findFirst({
      where: {
        project_id: projectId.value,
        user_id: userId.value,
        delete_flag: false,
      },
    });
    if (!result) return false;
    return true;
  }

  async count(projectId: GeneratedId) {
    const result = await prisma.projects_members.count({
      where: {
        project_id: projectId.value,
        delete_flag: false,
      },
    });
    return result;
  }
}

export default PrismaProjectsMembersQueryService;
