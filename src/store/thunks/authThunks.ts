import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { ResultCode } from 'enum';
import { setAppStatus, setIsLoggedIn } from 'store/actions';
import { AppThunkType } from 'store/thunks/type';
import { LoginParamsType } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const loginTC =
  (value: LoginParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'));
      const res = await authAPI.login(value);
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
    }
  };

export const logoutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus('loading'));
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setIsLoggedIn(false));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    const { message } = error as AxiosError;

    handleServerNetworkError(dispatch, message);
  } finally {
    dispatch(setAppStatus('succeeded'));
  }
};
