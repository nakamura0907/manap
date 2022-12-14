/**
 * 権限一覧のキー名
 * ルールなどにも利用
 */
const ROLE_NAME = [
  "ADMINISTRATOR",
  "CLIENT",
  "DEVELOPER",
  "LEADER",
  "CLIENT_LEADER",
] as const;
type RoleName = typeof ROLE_NAME[number];

export type Role = {
  id: number;
  name: string;
};
export type RoleList = {
  [key in RoleName]: Role;
};

/**
 * 権限一覧
 * データベースと対応
 */
export const ROLE_LIST: RoleList = {
  ADMINISTRATOR: {
    id: 1,
    name: "管理者",
  },
  LEADER: {
    id: 2,
    name: "リーダー",
  },
  DEVELOPER: {
    id: 3,
    name: "開発者",
  },
  CLIENT: {
    id: 4,
    name: "クライアント",
  },
  CLIENT_LEADER: {
    id: 5,
    name: "クライアントリーダー",
  },
};

/**
 * パーミッション
 */
const permission = [
  "project:update",
  "project:remove",
  "member:add",
  "member:read",
  "member:update",
  "member:remove",
  "feature-suggestion:update",
  "chat-room:create",
  "chat-room:update",
  "chat-room:remove",
] as const;
export type Permission = typeof permission;

type Rules = {
  [key in typeof ROLE_NAME[number]]: {
    static: Array<Permission[number]>;
    dynamic: {
      [key in Permission[number]]?: (object: { [key: string]: any }) => boolean;
    };
  };
};

/**
 * ルール
 */
export const rules: Rules = {
  ADMINISTRATOR: {
    static: [
      "project:update",
      "project:remove",
      "member:read",
      "feature-suggestion:update",
      "chat-room:create",
      "chat-room:update",
      "chat-room:remove",
    ],
    dynamic: {
      "member:add": (object) => {
        const { targetRoleId } = object;
        if (!targetRoleId) return false;

        return targetRoleId !== ROLE_LIST.ADMINISTRATOR.id;
      },
      "member:update": (object) => {
        const { targetRoleId } = object;
        if (!targetRoleId) return false;

        return targetRoleId !== ROLE_LIST.ADMINISTRATOR.id;
      },
      "member:remove": (object) => {
        const { targetRoleId } = object;
        if (!targetRoleId) return false;

        return targetRoleId !== ROLE_LIST.ADMINISTRATOR.id;
      },
    },
  },
  LEADER: {
    static: [
      "project:update",
      "member:read",
      "chat-room:create",
      "chat-room:update",
      "chat-room:remove",
    ],
    dynamic: {
      "member:add": (object) => {
        if (object.targetRoleId === ROLE_LIST.ADMINISTRATOR.id) return false;
        if (object.targetRoleId === ROLE_LIST.LEADER.id) return false;
        return true;
      },
      "member:update": (object) => {
        if (object.targetRoleId === ROLE_LIST.ADMINISTRATOR.id) return false;
        if (object.targetRoleId === ROLE_LIST.LEADER.id) return false;
        return true;
      },
      "member:remove": (object) => {
        const { targetRoleId } = object;
        if (!targetRoleId) return false;

        return targetRoleId !== ROLE_LIST.ADMINISTRATOR.id;
      },
      "feature-suggestion:update": (object) => {
        // clientApprovalは変更できない
        const { clientApproval } = object;

        return clientApproval !== undefined;
      },
    },
  },
  CLIENT_LEADER: {
    static: [
      "member:read",
      "chat-room:create",
      "chat-room:update",
      "chat-room:remove",
    ],
    dynamic: {
      "member:add": (object) => {
        const { targetRoleId } = object;
        if (!targetRoleId) return false;

        return targetRoleId === ROLE_LIST.CLIENT.id;
      },
      "feature-suggestion:update": (object) => {
        // vendorApprovalは変更できない
        const { vendorApproval } = object;

        return vendorApproval !== undefined;
      },
    },
  },
  DEVELOPER: {
    static: ["member:read"],
    dynamic: {
      "feature-suggestion:update": (object) => {
        const { vendorApproval, clientApproval } = object;

        return vendorApproval === undefined && clientApproval === undefined;
      },
    },
  },
  CLIENT: {
    static: ["member:read"],
    dynamic: {
      "feature-suggestion:update": (object) => {
        const { vendorApproval, clientApproval } = object;

        return vendorApproval === undefined && clientApproval === undefined;
      },
    },
  },
};

/**
 * 引数を元にROLE_LISTから権限を取得
 * @param roleId
 * @returns
 */
export const getRole = (roleId: number): Role | undefined => {
  return Object.values(ROLE_LIST).find((role) => role.id === roleId);
};

/**
 * 権限があるか判定を行う
 * @param roleId
 * @returns 権限がある場合はtrue
 */
export const checkPermission = (
  roleId: number,
  action: Permission[number],
  data?: Object
): boolean => {
  const keys = Object.keys(ROLE_LIST) as RoleName[];
  const role = keys.find((key) => ROLE_LIST[key].id === roleId);

  if (role === undefined) return false;
  if (rules[role].static.includes(action)) return true;

  const dynamic = rules[role].dynamic[action];
  if (!dynamic || !data) return false;

  return dynamic(data);
};
