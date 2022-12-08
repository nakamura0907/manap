export type TaskStatus = "未着手" | "進行中" | "完了済み";
export type TaskPriority = "設定なし" | "低" | "中" | "高";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  priority: TaskPriority;
};
