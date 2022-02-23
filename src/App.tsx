import { memo, useCallback, useEffect } from 'react';

import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import {
  AddItemForm,
  ButtonAppBar,
  ContainerTodoLists,
  ErrorSnackbar,
  LoadingBar,
} from 'components';
import { addTodoListTC, getTodoListsTC } from 'store/thunks';

export const App = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoListsTC());
  }, []);

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  //   );
  //   ws.onmessage = message => console.log(message);
  // }, []);
  //
  const addTodoListHandler = useCallback(
    (title: string) => {
      dispatch(addTodoListTC(title));
    },
    [dispatch],
  );

  return (
    <div>
      <ButtonAppBar />
      <LoadingBar />
      <Grid container justifyContent="center" style={{ padding: '20px' }}>
        <AddItemForm label="Name Todolist" addTask={addTodoListHandler} />
      </Grid>
      <ContainerTodoLists />
      <ErrorSnackbar />
    </div>
  );
});
