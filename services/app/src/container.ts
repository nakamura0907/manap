import { container } from "tsyringe";
import IAuthRepository from "./features/core/auth/domain/repository/IAuthRepository";
import PrismaAuthRepository from "./features/core/auth/repository/PrismaAuthRepository";
import IProjectsMembersQueryService from "./features/core/project-member/domain/repository/IProjectsMembersQueryService";
import IProjectsMembersRepository from "./features/core/project-member/domain/repository/IProjectsMembersRepository";
import ProjectMemberService from "./features/core/project-member/domain/service/ProjectMemberService";
import PrismaProjectsMembersQueryService from "./features/core/project-member/repository/PrismaProjectsMembersQueryService";
import PrismaProjectsMembersRepository from "./features/core/project-member/repository/PrismaProjectsMembersRepository";
import IProjectsQueryService from "./features/core/project/domain/repository/IProjectsQueryService";
import IProjectsRepository from "./features/core/project/domain/repository/IProjectsRepository";
import PrismaProjectsQueryService from "./features/core/project/repository/PrismaProjectsQueryService";
import PrismaProjectsRepository from "./features/core/project/repository/PrismaProjectsRepository";
import IRolesRepository from "./features/core/role/domain/repository/IRolesRepository";
import PrismaRolesRepository from "./features/core/role/repository/PrismaRolesRepository";

container.register("authRepository", {
  useClass: PrismaAuthRepository,
});

container.register("projectsRepository", {
  useClass: PrismaProjectsRepository,
});
container.register("projectsQueryService", {
  useClass: PrismaProjectsQueryService,
});

container.register("projectsMembersRepository", {
  useClass: PrismaProjectsMembersRepository,
});
container.register("projectsMembersQueryService", {
  useClass: PrismaProjectsMembersQueryService,
});
container.register("projectMemberService", {
  useClass: ProjectMemberService,
});

container.register("rolesRepository", {
  useClass: PrismaRolesRepository,
});

export const authRepository =
  container.resolve<IAuthRepository>("authRepository");

export const projectsRepository =
  container.resolve<IProjectsRepository>("projectsRepository");
export const projectsQueryService = container.resolve<IProjectsQueryService>(
  "projectsQueryService"
);

export const projectsMembersRepository =
  container.resolve<IProjectsMembersRepository>("projectsMembersRepository");
export const projectsMembersQueryService =
  container.resolve<IProjectsMembersQueryService>(
    "projectsMembersQueryService"
  );
export const projectMemberService = container.resolve<ProjectMemberService>(
  "projectMemberService"
);

export const rolesRepository =
  container.resolve<IRolesRepository>("rolesRepository");
