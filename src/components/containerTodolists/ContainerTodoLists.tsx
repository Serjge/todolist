import { memo, ReactElement, useCallback, useEffect } from 'react';

import { Container, Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AddItemForm, Todolist } from 'components';
import { selectIsLoginIn, selectTodoListArrayId } from 'store/selectors';
import { addTodoListTC, getTodoListsTC } from 'store/thunks';

export const ContainerTodoLists = memo((): ReactElement => {
  const dispatch = useDispatch();

  const todoListsId = useSelector(selectTodoListArrayId);
  const isLogin = useSelector(selectIsLoginIn);

  useEffect(() => {
    if (isLogin) {
      dispatch(getTodoListsTC());
    }
  }, []);

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodoListTC(title));
    },
    [dispatch],
  );

  const todoListsMap = todoListsId.map(id => (
    <Grid key={id} item>
      <Paper style={{ padding: '10px', position: 'relative' }}>
        <Todolist todolistId={id} />
      </Paper>
    </Grid>
  ));

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container justifyContent="center" style={{ padding: '20px' }}>
        <AddItemForm label="Name Todolist" addTask={addTodoList} />
      </Grid>
      <Container fixed>
        <Grid container spacing={3}>
          {todoListsMap}
        </Grid>
      </Container>
    </>
  );
});
