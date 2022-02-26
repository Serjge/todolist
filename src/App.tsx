import { memo, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  ButtonAppBar,
  ContainerTodoLists,
  ErrorSnackbar,
  LoadingBar,
  Login,
} from 'components';
import { selectIsInitialized } from 'store/selectors';
import { initializeAppTC } from 'store/thunks';

export const App = memo(() => {
  const dispatch = useDispatch();

  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ButtonAppBar />
      <LoadingBar />
      <Routes>
        <Route path="/" element={<ContainerTodoLists />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
      </Routes>
      {/* <ContainerTodoLists /> */}
      <ErrorSnackbar />
    </div>
  );
});
