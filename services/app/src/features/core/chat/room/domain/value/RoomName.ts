import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class RoomName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) throw new Exception("ルーム名を入力してください", 400);
    if (value.length > 50) {
      throw new Exception("ルーム名は50文字以内で入力してください", 400);
    }

    return new RoomName(value);
  }
}

export default RoomName;
