import { ReactElement, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { EditableSpan } from 'components/common';
import style from 'components/containerTodolists/todoList/TodoList.module.css';
import { rootReducerType } from 'store';
import { selectTodoListTitle } from 'store/selectors';
import { removeTodoListTC, renameTodoListTC } from 'store/thunks';

type TodolistTitlePropsType = {
  todolistId: string;
};

export const TodolistTitle = ({ todolistId }: TodolistTitlePropsType): ReactElement => {
  const dispatch = useDispatch();

  const title = useSelector(
    (state: rootReducerType) => selectTodoListTitle(state, todolistId),
    shallowEqual,
  );

  const deleteTodoList = useCallback(() => {
    dispatch(removeTodoListTC(todolistId));
  }, [todolistId]);

  const renameTodoList = useCallback(
    (titleTodolist: string) => {
      dispatch(renameTodoListTC(todolistId, titleTodolist));
    },
    [todolistId],
  );

  return (
    <h3 className={style.title}>
      <EditableSpan title={title} rename={renameTodoList} label="Name Todolist" />
      <IconButton onClick={deleteTodoList} aria-label="delete">
        <Delete />
      </IconButton>
    </h3>
  );
};
