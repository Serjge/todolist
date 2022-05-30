import { ChangeEvent, memo, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { EditableSpan } from 'components';
import { TaskStatuses } from 'enum';
import { rootReducerType } from 'store';
import { selectTaskTitle, selectTaskStatus } from 'store/selectors';
import { removeTaskTC, updateTaskTC } from 'store/thunks';

type TaskPropsType = {
  taskId: string;
  todolistId: string;
};

export const Task = memo(({ taskId, todolistId }: TaskPropsType) => {
  const dispatch = useDispatch();

  const taskStatus = useSelector((state: rootReducerType) =>
    selectTaskStatus(state, todolistId, taskId),
  );
  const taskTitle = useSelector((state: rootReducerType) =>
    selectTaskTitle(state, todolistId, taskId),
  );

  const deleteTask = useCallback(
    () => dispatch(removeTaskTC(todolistId, taskId)),
    [todolistId, taskId, dispatch],
  );

  const isDoneTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
      dispatch(updateTaskTC(todolistId, taskId, { status }));
    },
    [todolistId, taskId],
  );

  const renameTask = useCallback(
    (title: string) => dispatch(updateTaskTC(todolistId, taskId, { title })),
    [todolistId, taskId],
  );

  return (
    <div style={{ height: '60px' }} key={taskId} className={taskStatus ? 'is-done' : ''}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
        <Grid item>
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
            size="small"
            onChange={isDoneTask}
            checked={taskStatus === TaskStatuses.Completed}
          />
        </Grid>

        <Grid item>
          <EditableSpan rename={renameTask} title={taskTitle} label="Name Task" />
        </Grid>

        <Grid item>
          <IconButton onClick={deleteTask} aria-label="delete">
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
});
