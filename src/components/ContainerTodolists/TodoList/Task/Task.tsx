import { ChangeEvent, memo, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { EditableSpan } from 'components/index';
import { FIRST_INDEX } from 'const';
import { TaskStatuses } from 'enum';
import { selectTasks } from 'store/selectors';
import { removeTaskTC, updateTaskTC } from 'store/thunks';

type TaskPropsType = {
  taskId: string;
  todolistId: string;
};

export const Task = memo(({ taskId, todolistId }: TaskPropsType) => {
  const dispatch = useDispatch();

  const { status, title } = useSelector(selectTasks)[todolistId].filter(
    ({ id }) => id === taskId,
  )[FIRST_INDEX];

  const onClickDeleteTask = useCallback(
    () => dispatch(removeTaskTC(todolistId, taskId)),
    [todolistId, taskId, dispatch],
  );

  const isDoneTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;

      dispatch(
        updateTaskTC(todolistId, taskId, {
          status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        }),
      );
    },
    [dispatch, todolistId, taskId],
  );

  const renameTaskHandler = useCallback(
    (titleTask: string) =>
      dispatch(updateTaskTC(todolistId, taskId, { title: titleTask })),
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
            checked={status === TaskStatuses.Completed}
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
