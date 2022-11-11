import AuthCredential from "../domain/model/AuthCredential";
import IAuthRepository from "../domain/repository/IAuthRepository";
import EmailAuthCredential from "../domain/model/EmailAuthCredential";
import NickName from "../domain/value/Nickname";
import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";

class PrismaAuthRepository implements IAuthRepository {
  async signupByEmail(nickName: NickName, credential: EmailAuthCredential) {
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.users.create({
        data: {
          nickname: nickName.value,
        },
      });
      await prisma.users_auths.create({
        data: {
          identity_type: "email",
          identifier: credential.email,
          credential: credential.password,
          users: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    });
  }

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

    return this.createAuthCredential(
      result.users.id,
      result.identifier,
      result.credential
    );
  }

  async authByGithub(username: string, githubId: string, accessToken: string) {
    // GithubIdで検索
    const result = await prisma.users_auths.findFirst({
      where: {
        identity_type: "github",
        identifier: githubId,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result) {
      // 見つかった場合、アクセストークンを更新
      await prisma.users_auths.update({
        where: {
          id: result.id,
        },
        data: {
          credential: accessToken,
        },
      });

      return this.createAuthCredential(
        result.users.id,
        result.identifier,
        accessToken
      );
    }

    // 存在しない場合、新規作成
    const user = await prisma.users.create({
      data: {
        nickname: username,
      },
    });
    console.log(user);
    const auth = await prisma.users_auths.create({
      data: {
        identity_type: "github",
        identifier: githubId,
        credential: accessToken,
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return this.createAuthCredential(user.id, auth.identifier, auth.credential);
  }

  private createAuthCredential(
    id: number,
    identifier: string,
    credential: string
  ) {
    const generatedId = new GeneratedId(id);
    return new AuthCredential(generatedId, identifier, credential);
  }
}

export default PrismaAuthRepository;
