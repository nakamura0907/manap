import Project from "../domain/model/Project";
import IProjectsRepository from "../domain/repository/IProjectsRepository";
import Exception from "@/util/exception/Exception";
import { GeneratedId, NoneId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import { now } from "@/util/date";
import ProjectDetail from "../domain/model/ProjectDetail";

class PrismaProjectsRepository implements IProjectsRepository {
  async create(project: Project<NoneId>) {
    const owner = project.members[0];
    if (!owner)
      throw new Exception("プロジェクトのオーナーが存在しません", 400);

    const result = await prisma.$transaction(async (prisma) => {
      return await prisma.projects.create({
        data: {
          name: project.detail.name.value,
          description: project.detail.description.value,
          updated_at: now(),
          projects_members: {
            create: {
              user_id: owner.userId.value,
              role_id: owner.role.id,
            },
          },
        },
      });
    });
    const id = new GeneratedId(result.id);
    return project.setId(id);
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
}

export default PrismaProjectsRepository;
