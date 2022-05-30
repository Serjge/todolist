import { memo, useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import style from './TodoList.module.css';

import { TasksList, TodolistTitle } from 'components';
import { rootReducerType } from 'store';
import { selectTodoListEntityStatus } from 'store/selectors';
import { getTasksTC } from 'store/thunks';

type TodoListPropsType = {
  todolistId: string;
};

export const Todolist = memo(({ todolistId }: TodoListPropsType) => {
  const dispatch = useDispatch();

  const entityStatus = useSelector(
    (state: rootReducerType) => selectTodoListEntityStatus(state, todolistId),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getTasksTC(todolistId));
  }, []);

  return (
    <div className={entityStatus === 'loading' ? style.disable : ''}>
      <TodolistTitle todolistId={todolistId} />

      <TasksList todolistId={todolistId} />
    </div>
  );
});
