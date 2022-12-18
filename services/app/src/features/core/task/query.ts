type TaskListItem = {
  id: number;
  title: string;
  status: string;
};

/**
 * タスク一覧参照用オブジェクト
 */
export class TaskListDTO {
  private readonly _tasks: TaskListItem[];

  constructor(tasks: TaskListItem[]) {
    this._tasks = tasks;

    Object.freeze(this);
  }

  get tasks() {
    return this._tasks;
  }
}

/**
 * タスク詳細参照用オブジェクト
 */
export class TaskDetailDTO {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _status: string;
  private readonly _due: Date;
  private readonly _priority: string;

  constructor(
    id: number,
    title: string,
    description: string,
    status: string,
    due: Date,
    priority: string
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._status = status;
    this._due = due;
    this._priority = priority;

    Object.freeze(this);
  }

  get toObject() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      status: this._status,
      due: this._due,
      priority: this._priority,
    };
  }
}
