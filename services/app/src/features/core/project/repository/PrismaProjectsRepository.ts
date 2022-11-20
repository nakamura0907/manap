import Project from "../domain/model/Project";
import IProjectsRepository from "../domain/repository/IProjectsRepository";
import ProjectDetail from "../domain/model/ProjectDetail";
import { GeneratedId, NoneId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import { now } from "@/util/date";
import { ROLE_LIST } from "@common/role";

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
