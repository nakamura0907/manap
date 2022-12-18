import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class TaskTitle extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) throw new Exception("タスク名を入力してください", 400);
    if (value.length > 100) {
      throw new Exception("タスク名は100文字以内で入力してください", 400);
    }
    return new TaskTitle(value);
  }
}

export default TaskTitle;
