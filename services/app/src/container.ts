import ISuggestionsCommentsRepository from "@/features/core/feature-suggestion/comment/domain/repository/ISuggestionsCommentsRepository";
import PrismaSuggestionsCommentsRepository from "@/features/core/feature-suggestion/comment/repository/PrismaSuggestionsCommentsRepository";
import ISuggestionsQueryService from "@/features/core/feature-suggestion/suggestion/domain/repository/ISuggestionsQueryService";
import ISuggestionsRepository from "@/features/core/feature-suggestion/suggestion/domain/repository/ISuggestionsRepository";
import PrismaSuggestionsQueryService from "@/features/core/feature-suggestion/suggestion/repository/PrismaSuggestionsQueryService";
import PrismaSuggestionsRepository from "@/features/core/feature-suggestion/suggestion/repository/PrismaSuggestionsRepository";
import ITasksRepository from "@/features/core/task/domain/repository/ITasksRepository";
import PrismaTasksRepository from "@/features/core/task/repository/PrismaTasksRepository";
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

// Auth
container.register("authRepository", {
  useClass: PrismaAuthRepository,
});

export const authRepository =
  container.resolve<IAuthRepository>("authRepository");

// FeatureSuggestion
container.register("suggestionsQueryService", {
  useClass: PrismaSuggestionsQueryService,
});
container.register("suggestionsRepository", {
  useClass: PrismaSuggestionsRepository,
});

container.register("suggestionsCommentsRepository", {
  useClass: PrismaSuggestionsCommentsRepository,
});

export const suggestionsQueryService =
  container.resolve<ISuggestionsQueryService>("suggestionsQueryService");
export const suggestionsRepository = container.resolve<ISuggestionsRepository>(
  "suggestionsRepository"
);

export const suggestionsCommentsRepository =
  container.resolve<ISuggestionsCommentsRepository>(
    "suggestionsCommentsRepository"
  );

// Project
container.register("projectsRepository", {
  useClass: PrismaProjectsRepository,
});
container.register("projectsQueryService", {
  useClass: PrismaProjectsQueryService,
});

export const projectsRepository =
  container.resolve<IProjectsRepository>("projectsRepository");
export const projectsQueryService = container.resolve<IProjectsQueryService>(
  "projectsQueryService"
);

// ProjectMember
container.register("projectsMembersRepository", {
  useClass: PrismaProjectsMembersRepository,
});
container.register("projectsMembersQueryService", {
  useClass: PrismaProjectsMembersQueryService,
});
container.register("projectMemberService", {
  useClass: ProjectMemberService,
});

export const projectsMembersRepository =
  container.resolve<IProjectsMembersRepository>("projectsMembersRepository");
export const projectsMembersQueryService =
  container.resolve<IProjectsMembersQueryService>(
    "projectsMembersQueryService"
  );
export const projectMemberService = container.resolve<ProjectMemberService>(
  "projectMemberService"
);

// Role
container.register("rolesRepository", {
  useClass: PrismaRolesRepository,
});

export const rolesRepository =
  container.resolve<IRolesRepository>("rolesRepository");

// Task
container.register("tasksRepository", {
  useClass: PrismaTasksRepository,
});

export const tasksRepository =
  container.resolve<ITasksRepository>("tasksRepository");
