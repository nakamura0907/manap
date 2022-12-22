type ChatRoomListItem = {
  id: number;
  name: string;
};

/**
 * チャットルーム一覧参照用オブジェクト
 */
export class ChatRoomListDTO {
  private readonly _rooms: ChatRoomListItem[];

  constructor(rooms: ChatRoomListItem[]) {
    this._rooms = rooms;

    Object.freeze(this);
  }

  get rooms() {
    return this._rooms;
  }
}

/**
 * チャットルーム詳細参照用オブジェクト
 */
export class ChatRoomDetailDTO {
  private readonly _id: number;
  private readonly _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;

    Object.freeze(this);
  }

  get toObject() {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
