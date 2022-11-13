import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class ProjectName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(value: string) {
    if (value.length < 3 || value.length > 255)
      throw new Exception(
        "プロジェクト名は3文字以上255文字以下で入力してください",
        400
      );

    return new ProjectName(value);
  }
}

export default ProjectName;
