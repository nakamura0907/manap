import { GeneratedId } from "@/features/shared/Id";
import {
  prisma,
  PrismaClientKnownRequestError,
} from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";
import Member from "../domain/model/Member";
import IProjectsMembersRepository from "../domain/repository/IProjectsMembersRepository";

class PrismaProjectsMembersRepository implements IProjectsMembersRepository {
  async add(member: Member) {
    try {
      await prisma.projects_members.upsert({
        where: {
          project_id_user_id: {
            project_id: member.projectId.value,
            user_id: member.userId.value,
          },
        },
        update: {
          delete_flag: false,
        },
        create: {
          project_id: member.projectId.value,
          user_id: member.userId.value,
          role_id: member.role.id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        throw new Exception("そのユーザーは存在しません", 400);
      }
      throw new Exception("プロジェクトメンバーの追加に失敗しました");
    }
  }

  async update(member: Member) {
    await prisma.projects_members.update({
      where: {
        project_id_user_id: {
          project_id: member.projectId.value,
          user_id: member.userId.value,
        },
      },
      data: {
        role_id: member.role.id,
      },
    });
  }

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
