import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { ResultCode } from 'enum';
import { setAppStatus, setIsInitialized, setIsLoggedIn } from 'store/actions';
import { AppThunkType } from 'store/thunks/type';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus('loading'));
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setIsLoggedIn(true));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    const { message } = error as AxiosError;

    handleServerNetworkError(dispatch, message);
  } finally {
    dispatch(setAppStatus('succeeded'));
    dispatch(setIsInitialized(true));
  }
};
