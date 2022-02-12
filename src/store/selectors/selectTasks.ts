import { FIRST_INDEX } from 'const';
import { rootReducerType } from 'store/store';
import { TasksType, TaskType } from 'types';

export const selectTasks = (state: rootReducerType): TasksType => state.tasks;

export const selectTask = (
  state: rootReducerType,
  todolistId: string,
  id: string,
): TaskType => state.tasks[todolistId].filter(t => t.id === id)[FIRST_INDEX];
