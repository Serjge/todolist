import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addTodoList,
  removeTodolist,
  setTodoList,
} from 'store/reducers/todoListsReducer';
import { TasksType, TaskType } from 'types';

const initialState: TasksType = {};

const slice = createSlice({
  name: 'tasksReducer',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].push(action.payload.task);
    },
    removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      state[action.payload.todolistId] = state[action.payload.todolistId].filter(
        ({ id }) => id !== action.payload.taskId,
      );
    },
    setTasks(state, action: PayloadAction<{ todoListId: string; tasks: TaskType[] }>) {
      state[action.payload.todoListId] = action.payload.tasks;
    },
    changeTask(state, action: PayloadAction<{ task: TaskType }>) {
      const tasks = state[action.payload.task.todoListId];
      const index = tasks.findIndex(({ id }) => id === action.payload.task.id);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.task };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodoList, (state, action) => {
      state[action.payload.todoList.id] = [];
    });
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(setTodoList, (state, action) => {
      action.payload.todolistData.forEach(({ id }) => {
        state[id] = [];
      });
    });
  },
});

export const tasksReducer = slice.reducer;
export const { removeTask, setTasks, changeTask, addTask } = slice.actions;
