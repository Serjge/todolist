import { FIRST_INDEX } from 'const';
import { TaskStatuses } from 'enum';
import { rootReducerType } from 'store';
import { TaskType } from 'types';

export const selectTasks = (state: rootReducerType, todolistId: string): TaskType[] =>
  state.tasks[todolistId];

export const selectTask = (
  state: rootReducerType,
  todolistId: string,
  taskId: string,
): TaskType => state.tasks[todolistId].filter(({ id }) => id === taskId)[FIRST_INDEX];

export const selectTaskTitle = (
  state: rootReducerType,
  todolistId: string,
  taskId: string,
): string => state.tasks[todolistId].filter(({ id }) => id === taskId)[FIRST_INDEX].title;

export const selectTaskStatus = (
  state: rootReducerType,
  todolistId: string,
  taskId: string,
): TaskStatuses =>
  state.tasks[todolistId].filter(({ id }) => id === taskId)[FIRST_INDEX].status;
