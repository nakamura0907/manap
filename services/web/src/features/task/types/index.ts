export const taskStatus = ["未着手", "進行中", "完了済み"] as const;
export type TaskStatus = typeof taskStatus[number];

export const taskPriority = ["設定なし", "低", "中", "高"] as const;
export type TaskPriority = typeof taskPriority[number];

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  priority: TaskPriority;
};
