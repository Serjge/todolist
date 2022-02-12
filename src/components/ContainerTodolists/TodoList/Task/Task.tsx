import { ChangeEvent, memo, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { EditableSpan } from 'components/index';
import { FIRST_INDEX } from 'const';
import { changeStatus, removeTask, renameTask } from 'store/actions';
import { selectTasks } from 'store/selectors';

type TaskPropsType = {
  taskId: string;
  todolistId: string;
};

export const Task = memo(({ taskId, todolistId }: TaskPropsType) => {
  const { status, title } = useSelector(selectTasks)[todolistId].filter(
    ({ id }) => id === taskId,
  )[FIRST_INDEX];
  // const { isDone, title } = useSelector(state => getTask(state, todolistId, id));
  // const { isDone, title } = useSelector(selectTask);

  const dispatch = useDispatch();

  const onClickDeleteTask = useCallback(
    () => dispatch(removeTask(todolistId, taskId)),
    [todolistId, taskId, dispatch],
  );

  const isDoneTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeStatus(todolistId, taskId, e.currentTarget.checked));
    },
    [dispatch, todolistId, taskId],
  );

  const renameTaskHandler = useCallback(
    (titleTask: string) => dispatch(renameTask(todolistId, taskId, titleTask)),
    [todolistId, taskId, dispatch],
  );

  return (
    <div style={{ height: '60px' }} key={taskId} className={status ? 'is-done' : ''}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
        <Grid item>
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
            size="small"
            onChange={isDoneTask}
            checked
          />
        </Grid>
        <Grid item>
          <EditableSpan rename={renameTaskHandler} title={title} label="Name Task" />
        </Grid>
        <Grid item>
          <IconButton onClick={onClickDeleteTask} aria-label="delete">
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
});
