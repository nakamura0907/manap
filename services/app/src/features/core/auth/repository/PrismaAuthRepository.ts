import AuthCredential from "../domain/model/AuthCredential";
import IPrismaAuthRepository from "../domain/repository/IPrismaAuthRepository";
import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";

class PrismaAuthRepository implements IPrismaAuthRepository {
  async loginByEmail(email: string) {
    const result = await prisma.users_auths.findFirst({
      where: {
        identity_type: "email",
        identifier: email,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!result) return result;

    const id = new GeneratedId(result.users.id);
    return new AuthCredential(id, result.identifier, result.credential);
  }
}

export default PrismaAuthRepository;
