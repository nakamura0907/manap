import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class CommentBody extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) throw new Exception("コメントを入力して下さい", 400);
    if (value.length > 255)
      throw new Exception("コメントは255文字以内で入力してくだい", 400);

    return new CommentBody(value);
  }
}

export default CommentBody;
