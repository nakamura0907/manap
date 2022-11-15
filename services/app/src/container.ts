import { container } from "tsyringe";
import IAuthRepository from "./features/core/auth/domain/repository/IAuthRepository";
import PrismaAuthRepository from "./features/core/auth/repository/PrismaAuthRepository";
import IProjectsQueryService from "./features/core/projects/domain/repository/IProjectsQueryService";
import IProjectsRepository from "./features/core/projects/domain/repository/IProjectsRepository";
import PrismaProjectsQueryService from "./features/core/projects/repository/PrismaProjectsQueryService";
import PrismaProjectsRepository from "./features/core/projects/repository/PrismaProjectsRepository";

container.register("authRepository", {
  useClass: PrismaAuthRepository,
});
container.register("projectsRepository", {
  useClass: PrismaProjectsRepository,
});
container.register("projectsQueryService", {
  useClass: PrismaProjectsQueryService,
});

export const authRepository =
  container.resolve<IAuthRepository>("authRepository");
export const projectsRepository =
  container.resolve<IProjectsRepository>("projectsRepository");
export const projectsQueryService = container.resolve<IProjectsQueryService>(
  "projectsQueryService"
);
