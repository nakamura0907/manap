import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

const status = ["未着手", "進行中", "完了済み"] as const;
type Status = typeof status[number];

class TaskStatus extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) return new TaskStatus(status[0]);

    if (!status.includes(value as Status))
      throw new Exception("タスクステータスが不正です", 400);

    return new TaskStatus(value);
  }

  static getStatus(value: string) {
    return status.find((s) => s === value) || status[0];
  }
}

export default TaskStatus;
