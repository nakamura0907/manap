import Exception from "@/util/exception/Exception";
import IProjectsQueryService from "../domain/repository/IProjectsQueryService";
import { prisma } from "@/frameworks/database/prisma";
import { ProjectDTO, ProjectListItemDTO } from "../query";

class PrismaProjectsQueryService implements IProjectsQueryService {
  async fetchList(userId: number) {
    const result = await prisma.projects.findMany({
      where: {
        delete_flag: false,
        projects_members: {
          some: {
            user_id: userId,
            delete_flag: false,
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });
    return result.map((project) => {
      return new ProjectListItemDTO(
        project.id,
        project.name,
        project.description
      );
    });
  }

  async fetchById(projectId: number, userId: number) {
    const result = await prisma.projects.findFirst({
      where: {
        id: projectId,
        delete_flag: false,
      },
      include: {
        projects_members: {
          where: {
            user_id: userId,
            delete_flag: false,
          },
          take: 1,
        },
      },
    });
    if (!result) throw new Exception("プロジェクトが存在しません", 404);

    const member = result.projects_members[0];
    if (!member) throw new Exception("プロジェクトに参加していません", 400);

    return new ProjectDTO(
      result.id,
      result.name,
      result.description,
      member.role_id
    );
  }
}

export default PrismaProjectsQueryService;
