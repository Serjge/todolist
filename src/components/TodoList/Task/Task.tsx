import { ChangeEvent, memo, useCallback } from 'react';

import { Checkbox, Grid, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { EditableSpan } from 'components';
import { FIRST_INDEX } from 'const';
import { changeStatus, removeTask, renameTask } from 'store/actions';
import { selectTasks } from 'store/selectors';

type TaskPropsType = {
  id: string;
  todolistId: string;
};

export const Task = memo(({ id, todolistId }: TaskPropsType) => {
  const { isDone, title } = useSelector(selectTasks)[todolistId].filter(t => t.id === id)[
    FIRST_INDEX
  ];
  const dispatch = useDispatch();

  const onClickDeleteTask = useCallback(
    () => dispatch(removeTask(todolistId, id)),
    [todolistId, id, dispatch],
  );

  const isDoneTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeStatus(todolistId, id, e.currentTarget.checked));
    },
    [dispatch, todolistId, id],
  );

  const renameTaskHandler = useCallback(
    (titleTask: string) => dispatch(renameTask(todolistId, id, titleTask)),
    [todolistId, id, dispatch],
  );

  return (
    <div style={{ height: '60px' }} key={id} className={isDone ? 'is-done' : ''}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
        <Grid item>
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
            size="small"
            onChange={isDoneTask}
            checked={isDone}
            style={{ color: '#3f51b5' }}
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
