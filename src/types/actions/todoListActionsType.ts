import {
  addTodoList,
  changeFilterTodolist,
  removeTodolist,
  renameTodoList,
} from 'store/actions';

export type TodoActionType =
  | changeFilterTodolistType
  | removeTodolistType
  | addTodoListType
  | renameTodoListType;

export type changeFilterTodolistType = ReturnType<typeof changeFilterTodolist>;
export type removeTodolistType = ReturnType<typeof removeTodolist>;
export type addTodoListType = ReturnType<typeof addTodoList>;
export type renameTodoListType = ReturnType<typeof renameTodoList>;
