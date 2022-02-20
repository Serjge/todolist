import {
  FilterValuesType,
  RequestStatusType,
  TodoListsServerType,
  TodoListsType,
} from 'types';

export enum TODOLIST_ACTIONS {
  REMOVE = 'TODOLIST_REMOVE',
  ADD = 'TODOLIST_ADD',
  CHANGE_FILTER = 'TODOLIST_CHANGE_FILTER',
  RENAME = 'TODOLIST_RENAME',
  SET = 'TODOLIST_SET',
  CHANGE_ENTITY_STATUS = 'TODOLIST_CHANGE_ENTITY_STATUS',
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

export const changeTodolistEntityStatus = (
  todolistId: string,
  entityStatus: RequestStatusType,
) =>
  ({
    type: TODOLIST_ACTIONS.CHANGE_ENTITY_STATUS,
    payload: {
      todolistId,
      entityStatus,
    },
  } as const);
