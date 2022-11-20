import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class ProjectDescription extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(value: string) {
    if (!value) return new ProjectDescription("");
    if (value.length > 255)
      throw new Exception(
        "プロジェクトの説明は255文字以下で入力してください",
        400
      );

    return new ProjectDescription(value);
  }
}

export default ProjectDescription;
