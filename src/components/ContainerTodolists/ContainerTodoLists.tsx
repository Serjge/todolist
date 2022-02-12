import { memo, ReactElement } from 'react';

import { Container, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

import { Todolist } from 'components/ContainerTodolists/TodoList';
import { selectTodoListArray } from 'store/selectors';

export const ContainerTodoLists = memo((): ReactElement => {
  const todoLists = useSelector(selectTodoListArray);

  const TodoListsMap = todoLists.map(({ id }) => (
    <Grid key={id} item>
      <Paper style={{ padding: '10px' }}>
        <Todolist todolistId={id} />
      </Paper>
    </Grid>
  ));

  return (
    <Container fixed>
      <Grid container spacing={3}>
        {TodoListsMap}
      </Grid>
    </Container>
  );
});
