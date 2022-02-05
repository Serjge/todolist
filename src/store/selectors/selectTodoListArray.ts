import { rootReducerType } from 'store/store';
import { TodoListsType } from 'types';

export const selectTodoListArray = (state: rootReducerType): TodoListsType[] =>
  state.todoList;
