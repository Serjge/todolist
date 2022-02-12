import { TaskStatuses } from 'enum';
import { TodoListsServerType, TodoListsType } from 'types';

export enum TODOLIST_ACTIONS {
  REMOVE = 'Todolist/REMOVE',
  ADD = 'Todolist/ADD',
  CHANGE_FILTER = 'Todolist/CHANGE_FILTER',
  RENAME = 'Todolist/RENAME',
  SET = 'Todolist/SET',
  RENAME2 = 'Todolist/RENAME2',
}

export const changeFilterTodolist = (todolistId: string, filter: TaskStatuses) =>
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

export const addTodoList = (todoList: TodoListsType) =>
  ({
    type: TODOLIST_ACTIONS.ADD,
    payload: {
      todoList,
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

export const setTodoList = (todolistData: TodoListsServerType[]) =>
  ({
    type: TODOLIST_ACTIONS.SET,
    payload: {
      todolistData,
    },
  } as const);

export const rename2TodoList = (todolistId: string, title: string) =>
  ({
    type: TODOLIST_ACTIONS.RENAME2,
    payload: {
      todolistId,
      title,
    },
  } as const);
