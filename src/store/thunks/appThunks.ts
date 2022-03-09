import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { ResultCode } from 'enum';
import { setAppStatus, setIsInitialized } from 'store/reducers/appReducer';
import { setIsLoggedIn } from 'store/reducers/authReducer';
import { AppThunkType } from 'store/thunks/type';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus({ status: 'loading' }));
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setIsLoggedIn({ isLoginIn: true }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    const { message } = error as AxiosError;

    handleServerNetworkError(dispatch, message);
  } finally {
    dispatch(setAppStatus({ status: 'succeeded' }));
    dispatch(setIsInitialized({ initialized: true }));
  }
};
