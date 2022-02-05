import { rootReducerType } from 'store/store';
import { TasksType } from 'types';

export const selectTasks = (state: rootReducerType): TasksType => state.tasks;
