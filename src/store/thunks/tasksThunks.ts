import { AxiosError } from 'axios';

import { taskAPI } from 'api';
import { ResultCode } from 'enum';
import { rootReducerType, store } from 'store';
import { setAppStatus } from 'store/reducers/appReducer';
import { addTask, changeTask, removeTask, setTasks } from 'store/reducers/tasksReducer';
import { changeTodolistEntityStatus } from 'store/reducers/todoListsReducer';
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
      const res = await taskAPI.getTasks(todolistId);
      dispatch(setTasks({ todoListId: todolistId, tasks: res.data.items }));
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
      const res = await taskAPI.creatTask(todolistId, title);
      if (res.data.resultCode === ResultCode.success) {
        store.dispatch(addTask({ task: res.data.data.item }));
      } else {
        handleServerAppError(res.data, dispatch);
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
      const action = removeTask({ todolistId, taskId });
      dispatch(action);
      // dispatch(removeTask({ todolistId, taskId }));
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
      const task = selectTask(getState(), todolistId, taskId) as TaskType;
      const res = await taskAPI.updateTask({ ...task, ...change });
      if (res.data.resultCode === ResultCode.success) {
        dispatch(changeTask({ task: res.data.data.item }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: 'succeeded' }));
    }
  };
