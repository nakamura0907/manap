import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

const priority = ["設定なし", "低", "中", "高"] as const;
type Priority = typeof priority[number];

class TaskPriority extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) return new TaskPriority(priority[0]);

    if (!priority.includes(value as Priority))
      throw new Exception("タスク優先度が不正です", 400);

    return new TaskPriority(value);
  }

  static getPriority(value: string) {
    return priority.find((p) => p === value) || priority[0];
  }
}

export default TaskPriority;
