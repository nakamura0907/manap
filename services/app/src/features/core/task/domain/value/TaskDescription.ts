import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class TaskDescription extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) return new TaskDescription("");
    if (value.length > 500) {
      throw new Exception("タスクの説明は500文字以内で入力してください", 400);
    }
    return new TaskDescription(value);
  }
}

export default TaskDescription;
