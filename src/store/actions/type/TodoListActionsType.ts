import {
  addTodoList,
  changeFilterTodolist,
  changeTodolistEntityStatus,
  removeTodolist,
  renameTodoList,
  setTodoList,
} from 'store/reducers/todoListsReducer';

export type TodoListActionType =
  | ChangeFilterTodolistType
  | RemoveTodolistType
  | AddTodoListType
  | RenameTodoListType
  | SetTodoListType
  | ChangeTodolistEntityStatus;

export type ChangeFilterTodolistType = ReturnType<typeof changeFilterTodolist>;
export type RemoveTodolistType = ReturnType<typeof removeTodolist>;
export type AddTodoListType = ReturnType<typeof addTodoList>;
export type RenameTodoListType = ReturnType<typeof renameTodoList>;
export type SetTodoListType = ReturnType<typeof setTodoList>;
export type ChangeTodolistEntityStatus = ReturnType<typeof changeTodolistEntityStatus>;
