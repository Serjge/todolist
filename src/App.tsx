import React, { useCallback } from 'react';

import { Container, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { v1 } from 'uuid';

import { AddItemForm, ButtonAppBar, Todolist } from 'components';
import { addTodoList } from 'store/actions';
import { selectTodoListArray } from 'store/selectors';

export const App = React.memo(() => {
  const todoLists = useSelector(selectTodoListArray);
  const dispatch = useDispatch();

  const addTodoListHandler = useCallback(
    (title: string) => {
      const newId = v1();
      dispatch(addTodoList(newId, title));
    },
    [dispatch],
  );

  return (
    <div>
      <ButtonAppBar />
      <Container fixed>
        <Grid container justifyContent="center" style={{ padding: '20px' }}>
          <AddItemForm label="Name Todolist" addTask={addTodoListHandler} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map(({ id }) => (
            <Grid key={id} item>
              <Paper style={{ padding: '10px' }}>
                <Todolist todolistId={id} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
});
