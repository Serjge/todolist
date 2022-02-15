import { FIRST_INDEX } from 'const';
import { rootReducerType } from 'store';
import { FilterValuesType, TodoListsType } from 'types';

export const selectTodoListArray = (state: rootReducerType): TodoListsType[] =>
  state.todoList;

export const selectTodoList = (
  state: rootReducerType,
  todolistId: string,
): TodoListsType => state.todoList.filter(({ id }) => id === todolistId)[FIRST_INDEX];

export const selectTodoListTitle = (state: rootReducerType, todolistId: string): string =>
  state.todoList.filter(({ id }) => id === todolistId)[FIRST_INDEX].title;

export const selectTodoListFilter = (
  state: rootReducerType,
  todolistId: string,
): FilterValuesType =>
  state.todoList.filter(({ id }) => id === todolistId)[FIRST_INDEX].filter;
