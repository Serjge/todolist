import { AxiosError } from 'axios';

import { todolistAPI } from 'api';
import { setAppStatus } from 'store/reducers/appReducer';
import {
  addTodoList,
  changeTodolistEntityStatus,
  removeTodolist,
  renameTodoList,
  setTodoList,
} from 'store/reducers/todoListsReducer';
import { AppThunkType } from 'store/thunks';
import { handleServerNetworkError } from 'utils';

export const getTodoListsTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus({ status: 'loading' }));

    const { data } = await todolistAPI.getTodoList();

    dispatch(setTodoList({ todolistData: data }));
  } catch (error) {
    const { message } = error as AxiosError;

    handleServerNetworkError(dispatch, message);
  } finally {
    dispatch(setAppStatus({ status: 'succeeded' }));
  }
};

export const addTodoListTC =
  (title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));

      const {
        data: {
          data: { item },
        },
      } = await todolistAPI.createTodoList(title);

      dispatch(addTodoList({ todoList: item }));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
    }
  };

export const removeTodoListTC =
  (todoListId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      dispatch(
        changeTodolistEntityStatus({ todolistId: todoListId, entityStatus: 'loading' }),
      );

      await todolistAPI.deleteTodoList(todoListId);

      dispatch(removeTodolist({ todolistId: todoListId }));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
    }
  };

export const renameTodoListTC =
  (todoListId: string, title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      dispatch(
        changeTodolistEntityStatus({ todolistId: todoListId, entityStatus: 'loading' }),
      );

      await todolistAPI.updateTodoList(todoListId, title);

      dispatch(renameTodoList({ todolistId: todoListId, title }));
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(
        changeTodolistEntityStatus({ todolistId: todoListId, entityStatus: 'succeeded' }),
      );
    }
  };
