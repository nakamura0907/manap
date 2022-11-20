import Exception from "@/util/exception/Exception";
import IRolesRepository from "../domain/repository/IRolesRepository";
import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import { ProjectMemberRoleList } from "../query";

class PrismaRolesRepository implements IRolesRepository {
  async fetchRoleId(projectId: GeneratedId, userId: number) {
    const project = await prisma.projects.findFirst({
      where: {
        id: projectId.value,
        delete_flag: false,
      },
    });
    if (!project) throw new Exception("プロジェクトが存在しません", 404);

    const member = await prisma.projects_members.findFirst({
      where: {
        project_id: projectId.value,
        user_id: userId,
        delete_flag: false,
      },
    });
    if (!member) throw new Exception("プロジェクトに参加していません", 403);

    return member.role_id;
  }

  async fetchRoleList(projectId: GeneratedId) {
    const project = await prisma.projects.findFirst({
      where: {
        id: projectId.value,
        delete_flag: false,
      },
    });
    if (!project) throw new Exception("プロジェクトが存在しません", 404);

    const members = await prisma.projects_members.findMany({
      where: {
        project_id: projectId.value,
        delete_flag: false,
      },
    });

    const roles = members.map((member) => ({
      userId: member.user_id,
      roleId: member.role_id,
    }));
    return new ProjectMemberRoleList(roles);
  }
}

export default PrismaRolesRepository;
