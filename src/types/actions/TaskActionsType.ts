import { AddTodoListType, RemoveTodolistType, SetTodoListType } from '.';

import { addTask, changeStatus, removeTask, renameTask } from 'store/actions';

export type TasksActionType =
  | AddTaskType
  | RemoveTaskType
  | ChangeStatusType
  | RenameTaskType
  | AddTodoListType
  | RemoveTodolistType
  | SetTodoListType;

export type AddTaskType = ReturnType<typeof addTask>;
export type RemoveTaskType = ReturnType<typeof removeTask>;
export type ChangeStatusType = ReturnType<typeof changeStatus>;
export type RenameTaskType = ReturnType<typeof renameTask>;
