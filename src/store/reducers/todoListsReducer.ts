import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskPriorities } from 'enum';
import {
  FilterValuesType,
  RequestStatusType,
  TodoListsServerType,
  TodoListsType,
} from 'types';

const initialState: TodoListsType[] = [];

const slice = createSlice({
  name: 'todoListsReducer',
  initialState,
  reducers: {
    changeFilterTodolist(
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>,
    ) {
      const index = state.findIndex(({ id }) => id === action.payload.todolistId);
      state[index].filter = action.payload.filter;
    },

    removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
      return state.filter(({ id }) => id !== action.payload.todolistId);
    },

    addTodoList(state, action: PayloadAction<{ todoList: TodoListsType }>) {
      state.unshift({
        ...action.payload.todoList,
        filter: 'all',
        priority: TaskPriorities.Low,
        entityStatus: 'idle',
      });
    },

    renameTodoList(state, action: PayloadAction<{ todolistId: string; title: string }>) {
      const index = state.findIndex(({ id }) => id === action.payload.todolistId);
      state[index].title = action.payload.title;
    },

    setTodoList(state, action: PayloadAction<{ todolistData: TodoListsServerType[] }>) {
      return action.payload.todolistData.map(todolist => ({
        ...todolist,
        filter: 'all',
        priority: TaskPriorities.Low,
        entityStatus: 'idle',
      }));
    },

    changeTodolistEntityStatus(
      state,
      action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>,
    ) {
      const index = state.findIndex(({ id }) => id === action.payload.todolistId);
      state[index].entityStatus = action.payload.entityStatus;
    },
  },
});

export const {
  renameTodoList,
  setTodoList,
  addTodoList,
  removeTodolist,
  changeFilterTodolist,
  changeTodolistEntityStatus,
} = slice.actions;
export const todoListsReducer = slice.reducer;
