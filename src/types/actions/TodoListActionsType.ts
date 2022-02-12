import {
  addTodoList,
  changeFilterTodolist,
  removeTodolist,
  renameTodoList,
  setTodoList,
} from 'store/actions';

export type TodoListActionType =
  | ChangeFilterTodolistType
  | RemoveTodolistType
  | AddTodoListType
  | RenameTodoListType
  | SetTodoListType;

export type ChangeFilterTodolistType = ReturnType<typeof changeFilterTodolist>;
export type RemoveTodolistType = ReturnType<typeof removeTodolist>;
export type AddTodoListType = ReturnType<typeof addTodoList>;
export type RenameTodoListType = ReturnType<typeof renameTodoList>;
export type SetTodoListType = ReturnType<typeof setTodoList>;
