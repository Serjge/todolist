import { memo, ReactElement, useCallback, useEffect } from 'react';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AddItemForm, ButtonFilter, EditableSpan, Task } from 'components';
import style from 'components/ContainerTodolists/TodoList/TodoList.module.css';
import { FIRST_INDEX } from 'const';
import { TaskStatuses } from 'enum';
import { selectTasks, selectTodoListArray } from 'store/selectors';
import { addTaskTC, getTasksTC, removeTodoListTC, renameTodoListTC } from 'store/thunks';

type TodoListPropsType = {
  todolistId: string;
};

export const Todolist = memo(({ todolistId }: TodoListPropsType) => {
  const dispatch = useDispatch();

  let tasks = useSelector(selectTasks)[todolistId];

  const { filter, title } = useSelector(selectTodoListArray).filter(
    ({ id }) => id === todolistId,
  )[FIRST_INDEX];

  const ZERO_ARRAY_LENGTH = 0;

  const TasksRender = (): ReactElement | ReactElement[] => {
    if (tasks.length === ZERO_ARRAY_LENGTH) {
      return <span className={style.notFont}>Not fount task</span>;
    }

    return tasks.map(({ id }) => <Task taskId={id} todolistId={todolistId} key={id} />);
  };
  if (filter === 'active') {
    tasks = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (filter === 'completed') {
    tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  const addTaskHandler = useCallback(
    (titleTask: string) => dispatch(addTaskTC(todolistId, titleTask)),
    [todolistId, dispatch],
  );

  const onDeleteTodoListClick = useCallback(() => {
    dispatch(removeTodoListTC(todolistId));
  }, [todolistId, dispatch]);

  const renameTodoListHandler = useCallback(
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
        <EditableSpan
          title={title}
          rename={renameTodoListHandler}
          label="Name Todolist"
        />
        <IconButton onClick={onDeleteTodoListClick} aria-label="delete">
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm label="Name task" addTask={addTaskHandler} />
      <div>{TasksRender()}</div>
      <div className={style.wrapperButtons}>
        <ButtonFilter todolistId={todolistId} title="All" filterName="all" />
        <ButtonFilter todolistId={todolistId} title="Active" filterName="active" />
        <ButtonFilter todolistId={todolistId} title="Completed" filterName="completed" />
      </div>
    </div>
  );
});
