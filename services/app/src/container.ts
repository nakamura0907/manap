import { container } from "tsyringe";
import IAuthRepository from "./features/core/auth/domain/repository/IAuthRepository";
import PrismaAuthRepository from "./features/core/auth/repository/PrismaAuthRepository";
import IProjectsRepository from "./features/core/projects/domain/repository/IProjectsRepository";
import PrismaProjectsRepository from "./features/core/projects/repository/PrismaProjectsRepository";

container.register("authRepository", {
  useClass: PrismaAuthRepository,
});
container.register("projectsRepository", {
  useClass: PrismaProjectsRepository,
});

export const authRepository =
  container.resolve<IAuthRepository>("authRepository");
export const projectsRepository =
  container.resolve<IProjectsRepository>("projectsRepository");
