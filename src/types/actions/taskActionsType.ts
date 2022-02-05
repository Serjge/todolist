import { addTodoListType, removeTodolistType } from '.';

import { addTask, changeStatus, removeTask, renameTask } from 'store/actions';

export type TasksActionType =
  | addTaskType
  | removeTaskType
  | changeStatusType
  | renameTaskType
  | addTodoListType
  | removeTodolistType;

export type addTaskType = ReturnType<typeof addTask>;
export type removeTaskType = ReturnType<typeof removeTask>;
export type changeStatusType = ReturnType<typeof changeStatus>;
export type renameTaskType = ReturnType<typeof renameTask>;
