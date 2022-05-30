import { memo, ReactElement } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectIsLoginIn } from 'store/selectors';
import { logoutTC } from 'store/thunks';

export const ButtonAppBar = memo((): ReactElement => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLoginIn);

  const onLogoutClick = (): void => {
    dispatch(logoutTC());
  };
  const onLoginClick = (): void => {
    navigate('/login');
  };

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
          {isLogin ? (
            <Button onClick={onLogoutClick} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={onLoginClick} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});
