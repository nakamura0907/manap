import { container } from "tsyringe";
import IAuthRepository from "./features/core/auth/domain/repository/IAuthRepository";
import PrismaAuthRepository from "./features/core/auth/repository/PrismaAuthRepository";

container.register("authRepository", {
  useClass: PrismaAuthRepository,
});

export const authRepository =
  container.resolve<IAuthRepository>("authRepository");
