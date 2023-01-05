import Project from "../domain/model/Project";
import IProjectsRepository from "../domain/repository/IProjectsRepository";
import ProjectDetail from "../domain/model/ProjectDetail";
import { GeneratedId, NoneId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import { now } from "@/util/date";
import { ROLE_LIST } from "@common/role";
import Exception from "@/util/exception/Exception";
import ProjectName from "@/features/core/project/domain/value/ProjectName";
import ProjectDescription from "@/features/core/project/domain/value/ProjectDescription";

class PrismaProjectsRepository implements IProjectsRepository {
  async create(project: Project<NoneId>) {
    const result = await prisma.$transaction(async (prisma) => {
      return await prisma.projects.create({
        data: {
          name: project.detail.name.value,
          description: project.detail.description.value,
          updated_at: now(),
          projects_members: {
            create: {
              user_id: project.ownerId.value,
              role_id: ROLE_LIST.ADMINISTRATOR.id,
            },
          },
        },
      });
    });
    const id = new GeneratedId(result.id);
    return project.setId(id);
  }

  async find(projectId: GeneratedId) {
    const result = await prisma.projects.findFirst({
      where: {
        id: projectId.value,
      },
      include: {
        projects_members: {
          include: {
            users: true,
            roles: true,
          },
          where: {
            role_id: ROLE_LIST.ADMINISTRATOR.id,
          },
        },
      },
    });
    if (!result) throw new Exception("プロジェクトが見つかりません", 404);
    if (result.projects_members.length === 0)
      throw new Exception("不正なプロジェクトです", 500);

    const ownerId = new GeneratedId(result.projects_members[0].user_id);
    const detail = new ProjectDetail(
      projectId,
      new ProjectName(result.name),
      new ProjectDescription(result.description)
    );
    return new Project(ownerId, detail);
  }

  async update(project: ProjectDetail<GeneratedId>) {
    await prisma.projects.update({
      where: {
        id: project.id.value,
      },
      data: {
        name: project.name.value,
        description: project.description.value,
        updated_at: now(),
      },
    });
  }

  async remove(projectId: GeneratedId) {
    await prisma.projects.update({
      where: {
        id: projectId.value,
      },
      data: {
        delete_flag: true,
      },
    });
  }
}

export default PrismaProjectsRepository;
