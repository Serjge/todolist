import { AxiosError } from 'axios';

import { todolistAPI } from 'api';
import {
  addTodoList,
  removeTodolist,
  renameTodoList,
  setAppStatus,
  setTodoList,
  changeTodolistEntityStatus,
} from 'store/actions';
import { AppThunkType } from 'store/thunks';
import { handleServerNetworkError } from 'utils';

export const getTodoListsTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus('loading'));
    const res = await todolistAPI.getTodoList();
    dispatch(setTodoList(res.data));
  } catch (error) {
    const { message } = error as AxiosError;

    handleServerNetworkError(dispatch, message);
  } finally {
    dispatch(setAppStatus('succeeded'));
  }
};

export const addTodoListTC =
  (title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'));
      const res = await todolistAPI.createTodoList(title);
      dispatch(addTodoList(res.data.data.item));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus('succeeded'));
    }
  };

export const removeTodoListTC =
  (todoListId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'));
      dispatch(changeTodolistEntityStatus(todoListId, 'loading'));
      await todolistAPI.deleteTodoList(todoListId);
      dispatch(removeTodolist(todoListId));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus('succeeded'));
    }
  };

export const renameTodoListTC =
  (todoListId: string, title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'));
      dispatch(changeTodolistEntityStatus(todoListId, 'loading'));
      await todolistAPI.updateTodoList(todoListId, title);
      dispatch(renameTodoList(todoListId, title));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus('succeeded'));
      dispatch(changeTodolistEntityStatus(todoListId, 'succeeded'));
    }
  };
