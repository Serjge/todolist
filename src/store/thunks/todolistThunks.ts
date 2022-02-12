import { todolistAPI } from 'api';
import { addTodoList, removeTodolist, renameTodoList, setTodoList } from 'store/actions';
import { AppThunkType } from 'types';

export const getTodoListsTC = (): AppThunkType => async dispatch => {
  try {
    const res = await todolistAPI.getTodoList();
    dispatch(setTodoList(res.data));
  } catch (e) {
    throw Error('error getTodoListsTC');
  }
};

export const addTodoListTC =
  (title: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await todolistAPI.createTodoList(title);
      dispatch(addTodoList(res.data.data.item));
    } catch (e) {
      throw Error('error addTodoListTC');
    }
  };

export const removeTodoListTC =
  (todoListId: string): AppThunkType =>
  async dispatch => {
    try {
      await todolistAPI.deleteTodoList(todoListId);
      dispatch(removeTodolist(todoListId));
    } catch (e) {
      throw Error('error removeTodoListTC');
    }
  };

export const renameTodoListTC =
  (todoListId: string, title: string): AppThunkType =>
  async dispatch => {
    try {
      await todolistAPI.updateTodoList(todoListId, title);
      dispatch(renameTodoList(todoListId, title));
    } catch (e) {
      throw Error('error updateTitleTodoListTC');
    }
  };
