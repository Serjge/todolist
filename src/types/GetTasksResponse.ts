import { TaskType } from 'types';

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
