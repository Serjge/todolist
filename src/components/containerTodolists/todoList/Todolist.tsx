import { memo, ReactElement, useCallback, useEffect } from 'react';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import style from './TodoList.module.css';

import { AddItemForm, ButtonFilter, EditableSpan, Task } from 'components';
import { TaskStatuses } from 'enum';
import { rootReducerType } from 'store';
import { selectTasks, selectTodoListFilter, selectTodoListTitle } from 'store/selectors';
import { addTaskTC, getTasksTC, removeTodoListTC, renameTodoListTC } from 'store/thunks';

type TodoListPropsType = {
  todolistId: string;
};

export const Todolist = memo(({ todolistId }: TodoListPropsType) => {
  const dispatch = useDispatch();

  let tasks = useSelector((state: rootReducerType) => selectTasks(state, todolistId));
  const title = useSelector((state: rootReducerType) =>
    selectTodoListTitle(state, todolistId),
  );
  const filter = useSelector((state: rootReducerType) =>
    selectTodoListFilter(state, todolistId),
  );

  const ZERO_ARRAY_LENGTH = 0;

  const TasksRender = (): ReactElement | ReactElement[] => {
    if (tasks.length === ZERO_ARRAY_LENGTH) {
      return <span className={style.notFont}>Not fount task</span>;
    }

    return tasks.map(({ id }) => <Task taskId={id} todolistId={todolistId} key={id} />);
  };

  if (filter === 'active') {
    tasks = tasks.filter(({ status }) => status === TaskStatuses.New);
  }
  if (filter === 'completed') {
    tasks = tasks.filter(({ status }) => status === TaskStatuses.Completed);
  }

  const addTask = useCallback(
    (titleTask: string) => dispatch(addTaskTC(todolistId, titleTask)),
    [todolistId, dispatch],
  );

  const deleteTodoList = useCallback(() => {
    dispatch(removeTodoListTC(todolistId));
  }, [todolistId, dispatch]);

  const renameTodoList = useCallback(
    (titleTodolist: string) => {
      dispatch(renameTodoListTC(todolistId, titleTodolist));
    },
    [todolistId, dispatch],
  );

  useEffect(() => {
    dispatch(getTasksTC(todolistId));
  }, []);

  return (
    <div>
      <h3 className={style.title}>
        <EditableSpan title={title} rename={renameTodoList} label="Name Todolist" />
        <IconButton onClick={deleteTodoList} aria-label="delete">
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm label="Name task" addTask={addTask} />
      <div>{TasksRender()}</div>
      <div className={style.wrapperButtons}>
        <ButtonFilter todolistId={todolistId} title="All" filterName="all" />
        <ButtonFilter todolistId={todolistId} title="Active" filterName="active" />
        <ButtonFilter todolistId={todolistId} title="Completed" filterName="completed" />
      </div>
    </div>
  );
});
