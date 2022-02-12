import { TaskPriorities, TaskStatuses } from 'enum';

export type TodoListsServerType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TodoListsType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  filter: TaskStatuses;
  priority: TaskPriorities;
};
