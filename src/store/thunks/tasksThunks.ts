import { AxiosError } from 'axios';

import { taskAPI } from 'api';
import { ResultCode } from 'enum';
import { rootReducerType, store } from 'store';
import {
  addTask,
  changeTask,
  removeTask,
  setTasks,
  changeTodolistEntityStatus,
  setAppStatus,
} from 'store/reducers';
import { selectTask } from 'store/selectors';
import { AppThunkType } from 'store/thunks';
import { TaskType } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const getTasksTC =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'idle' }));

      const {
        data: { items },
      } = await taskAPI.getTasks(todolistId);

      dispatch(setTasks({ todoListId: todolistId, tasks: items }));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'succeeded' }));
    }
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'loading' }));

      const {
        data: {
          data: { item },
          resultCode,
          messages,
        },
      } = await taskAPI.creatTask(todolistId, title);

      if (resultCode === ResultCode.success) {
        store.dispatch(addTask({ task: item }));
      } else {
        handleServerAppError(messages, dispatch);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'succeeded' }));
    }
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'loading' }));

      await taskAPI.deleteTask(todolistId, taskId);

      dispatch(removeTask({ todolistId, taskId }));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'succeeded' }));
    }
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, change: Partial<TaskType>): AppThunkType =>
  async (dispatch, getState: () => rootReducerType) => {
    try {
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'loading' }));
      dispatch(setAppStatus({ status: 'loading' }));

      const task = selectTask(getState(), todolistId, taskId);
      const {
        data: {
          data: { item },
          resultCode,
          messages,
        },
      } = await taskAPI.updateTask({ ...task, ...change });

      if (resultCode === ResultCode.success) {
        dispatch(changeTask({ task: item }));
      } else {
        handleServerAppError(messages, dispatch);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'succeeded' }));
    }
  };
