import { memo, useCallback } from 'react';

import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import { AddItemForm, ButtonAppBar, ContainerTodoLists } from 'components';
import { addTodoList } from 'store/actions';

export const App = memo(() => {
  const dispatch = useDispatch();

  const addTodoListHandler = useCallback(
    (title: string) => {
      dispatch(addTodoList(title));
    },
    [dispatch],
  );
  return (
    <div>
      <ButtonAppBar />
      <Grid container justifyContent="center" style={{ padding: '20px' }}>
        <AddItemForm label="Name Todolist" addTask={addTodoListHandler} />
      </Grid>
      <ContainerTodoLists />
    </div>
  );
});
