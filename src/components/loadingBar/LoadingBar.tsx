import React, { ReactElement } from 'react';

import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectStatus } from 'store/selectors';

export const LoadingBar = (): ReactElement => {
  const status = useSelector(selectStatus);

  return (
    <div style={{ height: '50px' }}>{status === 'loading' && <LinearProgress />}</div>
  );
};
