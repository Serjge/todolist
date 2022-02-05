import { memo, useCallback } from 'react';

import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { AddItemForm, ButtonFilter, EditableSpan, Task } from 'components';
import { FIRST_INDEX } from 'const';
import { addTask, removeTodolist, renameTodoList } from 'store/actions';
import { selectTodoListArray } from 'store/selectors';
import { selectTasks } from 'store/selectors/selectTasks';

type TodoListPropsType = {
  todolistId: string;
};

export const Todolist = memo(({ todolistId }: TodoListPropsType) => {
  let tasks = useSelector(selectTasks)[todolistId];

  const { title, filter } = useSelector(selectTodoListArray).filter(
    ({ id }) => id === todolistId,
  )[FIRST_INDEX];

  const dispatch = useDispatch();

  if (filter === 'active') {
    tasks = tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
    tasks = tasks.filter(t => t.isDone);
  }

  const addTaskHandler = useCallback(
    (titleTask: string) => dispatch(addTask(todolistId, titleTask)),
    [todolistId, dispatch],
  );

  const onDeleteTodoListClick = useCallback(() => {
    dispatch(removeTodolist(todolistId));
  }, [todolistId, dispatch]);

  const renameTodoListHandler = useCallback(
    (titleTodolist: string) => {
      dispatch(renameTodoList(todolistId, titleTodolist));
    },
    [todolistId, dispatch],
  );

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
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
      <div>
        {tasks.map(({ id: taskId }) => (
          <Task id={taskId} todolistId={todolistId} key={taskId} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonFilter todolistId={todolistId} title="All" filterName="all" />
        <ButtonFilter todolistId={todolistId} title="Completed" filterName="completed" />
        <ButtonFilter todolistId={todolistId} title="Active" filterName="active" />
      </div>
    </div>
  );
});
