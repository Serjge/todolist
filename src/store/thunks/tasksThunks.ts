import { AxiosError } from 'axios';

import { taskAPI } from 'api';
import { ResultCode } from 'enum';
import { rootReducerType } from 'store';
import {
  addTask,
  changeTask,
  removeTask,
  setAppStatus,
  setTasks,
  changeTodolistEntityStatus,
} from 'store/actions';
import { selectTask } from 'store/selectors';
import { AppThunkType } from 'store/thunks';
import { TaskType } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const getTasksTC =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'));
      dispatch(changeTodolistEntityStatus(todolistId, 'idle'));
      const res = await taskAPI.getTasks(todolistId);
      dispatch(setTasks(todolistId, res.data.items));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus('succeeded'));
      dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'));
    }
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'));
      dispatch(changeTodolistEntityStatus(todolistId, 'loading'));
      const res = await taskAPI.creatTask(todolistId, title);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(addTask(res.data.data.item));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus('succeeded'));
      dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'));
    }
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'));
      dispatch(changeTodolistEntityStatus(todolistId, 'loading'));
      await taskAPI.deleteTask(todolistId, taskId);
      dispatch(removeTask(todolistId, taskId));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus('succeeded'));
      dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'));
    }
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, change: Partial<TaskType>): AppThunkType =>
  async (dispatch, getState: () => rootReducerType) => {
    try {
      dispatch(changeTodolistEntityStatus(todolistId, 'loading'));
      dispatch(setAppStatus('loading'));
      const task = selectTask(getState(), todolistId, taskId) as TaskType;
      const res = await taskAPI.updateTask({ ...task, ...change });
      if (res.data.resultCode === ResultCode.success) {
        dispatch(changeTask(res.data.data.item));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus('succeeded'));
      dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'));
    }
  };
