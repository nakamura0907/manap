import TaskDescription from "@/features/core/task/domain/value/TaskDescription";
import TaskPriority from "@/features/core/task/domain/value/TaskPriority";
import TaskStatus from "@/features/core/task/domain/value/TaskStatus";
import TaskTitle from "@/features/core/task/domain/value/TaskTitle";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";

type ModifyObjefct = {
  title?: string;
  description?: string;
  status?: string;
  due?: string;
  priority?: string;
};

class Task<T extends Id = Id> {
  private readonly _id: T;
  private readonly _projectId: GeneratedId;
  private readonly _title: TaskTitle;
  private readonly _description: TaskDescription;
  private readonly _status: TaskStatus;
  private readonly _due: Date;
  private readonly _priority: TaskPriority;

  constructor(
    id: T,
    projectId: GeneratedId,
    title: TaskTitle,
    description: TaskDescription,
    status: TaskStatus,
    due: Date,
    priority: TaskPriority
  ) {
    this._id = id;
    this._projectId = projectId;
    this._title = title;
    this._description = description;
    this._status = status;
    this._due = due;
    this._priority = priority;
  }

  static create(
    projectId: GeneratedId,
    title: string,
    description: string,
    status: string,
    due: string,
    priority: string
  ) {
    const validatedTitle = TaskTitle.validate(title);
    const validatedDescription = TaskDescription.validate(description);
    const validatedStatus = TaskStatus.validate(status);
    const validatedDue = new Date(due);
    const validatedPriority = TaskPriority.validate(priority);

    return new Task(
      NoneId.instance,
      projectId,
      validatedTitle,
      validatedDescription,
      validatedStatus,
      validatedDue,
      validatedPriority
    );
  }

  get id() {
    return this._id;
  }

  get projectId() {
    return this._projectId;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get status() {
    return this._status;
  }

  get due() {
    return this._due;
  }

  get priority() {
    return this._priority;
  }

  setId(id: GeneratedId) {
    return new Task(
      id,
      this._projectId,
      this._title,
      this._description,
      this._status,
      this._due,
      this._priority
    );
  }

  copyWith(modifyObj: ModifyObjefct) {
    const title = modifyObj.title
      ? TaskTitle.validate(modifyObj.title)
      : this._title;
    const description = modifyObj.description
      ? TaskDescription.validate(modifyObj.description)
      : this._description;
    const status = modifyObj.status
      ? TaskStatus.validate(modifyObj.status)
      : this._status;
    const due = modifyObj.due ? new Date(modifyObj.due) : this._due;
    const priority = modifyObj.priority
      ? TaskPriority.validate(modifyObj.priority)
      : this._priority;

    return new Task(
      this._id,
      this._projectId,
      title,
      description,
      status,
      due,
      priority
    );
  }
}

export default Task;
