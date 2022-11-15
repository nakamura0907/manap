import { prisma } from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";
import IProjectsQueryService from "../domain/repository/IProjectsQueryService";
import { ProjectDTO } from "../query";

class PrismaProjectsQueryService implements IProjectsQueryService {
  async fetchById(projectId: number) {
    const result = await prisma.projects.findFirst({
      where: {
        id: projectId,
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
    return new ProjectDTO(result.id, result.name, result.description, members);
  }
}

export default PrismaProjectsQueryService;
