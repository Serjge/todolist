import { ReactElement } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { selectStatus } from 'store/selectors';

export const ButtonAppBar = (): ReactElement => {
  const status = useSelector(selectStatus);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Todolist
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
    </Box>
  );
};
