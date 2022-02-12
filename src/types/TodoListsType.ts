import { TaskPriorities } from 'enum';
import { FilterValuesType } from 'types';

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
  filter: FilterValuesType;
  priority: TaskPriorities;
};
