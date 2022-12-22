import Exception from "@/util/exception/Exception";
import {
  chatsRoomsQueryService,
  chatsRoomsRepository,
  projectMemberService,
  rolesRepository,
} from "@/container";
import { GeneratedId } from "@/features/shared/Id";
import { checkPermission } from "@common/role";
import { NextFunction, Request, Response } from "express";
import ChatRoom from "@/features/core/chat/room/domain/model/ChatRoom";

type ChatRoomController = {
  /** チャットルームを作成する */
  create: (req: Request, res: Response, next: NextFunction) => void;
  /** チャットルームの一覧を取得する */
  fetchList: (req: Request, res: Response, next: NextFunction) => void;
  /** チャットルームの詳細を取得する */
  fetchById: (req: Request, res: Response, next: NextFunction) => void;
  /** チャットルームを更新する */
  update: (req: Request, res: Response, next: NextFunction) => void;
  /** チャットルームを削除する */
  remove: (req: Request, res: Response, next: NextFunction) => void;
};

const chatRoomController = (): ChatRoomController => {
  const create = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;

      const { name } = req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // 権限確認
      const roleId = await rolesRepository.fetchRoleId(projectId, userId.value);
      if (!checkPermission(roleId, "chat-room:create"))
        throw new Exception("チャットルームを作成する権限がありません", 403);

      // チャットルームを作成
      const createdChatRoom = ChatRoom.create(projectId, name);
      const result = await chatsRoomsRepository.create(createdChatRoom);

      res.status(200).send({
        id: result.id.value,
        name: result.name.value,
        createdAt: result.createdAt,
      });
    })().catch(next);
  };

  const fetchList = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // チャットルーム一覧取得
      const result = await chatsRoomsQueryService.fetchList(projectId);

      res.status(200).send({
        rooms: result.rooms,
      });
    })().catch(next);
  };

  const fetchById = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqRoomId = req.params.roomId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const roomId = GeneratedId.validate(Number(reqRoomId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // ルーム所属確認

      // チャットルーム詳細取得
      const result = await chatsRoomsQueryService.fetchById(roomId);

      res.status(200).send(result.toObject);
    })().catch(next);
  };

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqRoomId = req.params.roomId;

      const { name } = req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const roomId = GeneratedId.validate(Number(reqRoomId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // ルーム所属確認

      // 権限確認
      const roleId = await rolesRepository.fetchRoleId(projectId, userId.value);
      if (!checkPermission(roleId, "chat-room:update"))
        throw new Exception("チャットルームを更新する権限がありません", 403);

      // チャットルーム更新
      const currentChatRoom = await chatsRoomsRepository.find(
        projectId,
        roomId
      );
      const updatedChatRoom = currentChatRoom.copyWith({ name });

      await chatsRoomsRepository.update(updatedChatRoom);

      res.status(200).send({
        id: updatedChatRoom.id.value,
        name: updatedChatRoom.name.value,
        createdAt: updatedChatRoom.createdAt,
      });
    })().catch(next);
  };

  const remove = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqRoomId = req.params.roomId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const roomId = GeneratedId.validate(Number(reqRoomId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // ルーム所属確認

      // 権限確認
      const roleId = await rolesRepository.fetchRoleId(projectId, userId.value);
      if (!checkPermission(roleId, "chat-room:remove"))
        throw new Exception("チャットルームを削除する権限がありません", 403);

      // チャットルーム削除
      await chatsRoomsRepository.remove(roomId);

      res.status(200).end();
    })().catch(next);
  };

  return {
    create,
    fetchList,
    fetchById,
    update,
    remove,
  };
};

export default chatRoomController;
