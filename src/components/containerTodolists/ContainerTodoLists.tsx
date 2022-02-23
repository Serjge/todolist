import { memo, ReactElement } from 'react';

import { Container, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

import { Todolist } from 'components';
import { selectTodoListArrayId } from 'store/selectors';

export const ContainerTodoLists = memo((): ReactElement => {
  const todoListsId = useSelector(selectTodoListArrayId);

  const TodoListsMap = todoListsId.map(id => (
    <Grid key={id} item>
      <Paper style={{ padding: '10px', position: 'relative' }}>
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
