import { AddTodoListType, RemoveTodolistType, SetTodoListType } from '.';

import { addTask, changeTask, removeTask, setTasks } from 'store/reducers/tasksReducer';

export type TasksActionType =
  | AddTaskType
  | RemoveTaskType
  | AddTodoListType
  | RemoveTodolistType
  | SetTodoListType
  | SetTaskType
  | ChangeTaskType;

export type AddTaskType = ReturnType<typeof addTask>;
export type RemoveTaskType = ReturnType<typeof removeTask>;
export type SetTaskType = ReturnType<typeof setTasks>;
export type ChangeTaskType = ReturnType<typeof changeTask>;
