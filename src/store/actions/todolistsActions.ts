import { v1 } from 'uuid';

import { FilterValuesType } from 'types';

export enum TODOLIST_ACTIONS {
  REMOVE = 'Todolist/REMOVE',
  ADD = 'Todolist/ADD',
  CHANGE_FILTER = 'Todolist/CHANGE_FILTER',
  RENAME = 'Todolist/RENAME',
}

export const changeFilterTodolist = (todolistId: string, filter: FilterValuesType) =>
  ({
    type: TODOLIST_ACTIONS.CHANGE_FILTER,
    payload: {
      todolistId,
      filter,
    },
  } as const);
export const removeTodolist = (todolistId: string) =>
  ({
    type: TODOLIST_ACTIONS.REMOVE,
    payload: {
      todolistId,
    },
  } as const);
export const addTodoList = (todolistId: string, title: string) =>
  ({
    type: TODOLIST_ACTIONS.ADD,
    payload: {
      todolistId: v1(),
      title,
    },
  } as const);
export const renameTodoList = (todolistId: string, title: string) =>
  ({
    type: TODOLIST_ACTIONS.RENAME,
    payload: {
      todolistId,
      title,
    },
  } as const);
