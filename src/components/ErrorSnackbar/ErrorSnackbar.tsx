import { forwardRef, ReactElement, SyntheticEvent } from 'react';

import { AlertProps, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { setAppError } from 'store/actions';
import { selectError } from 'store/selectors';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar = (): ReactElement => {
  const dispatch = useDispatch();

  const error = useSelector(selectError);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppError(null));
  };

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error} 😠
      </Alert>
    </Snackbar>
  );
};
