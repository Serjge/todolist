import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { ResultCode } from 'enum';
import { setAppStatus } from 'store/reducers/appReducer';
import { setIsLoggedIn } from 'store/reducers/authReducer';
import { AppThunkType } from 'store/thunks/type';
import { LoginParamsType } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const loginTC =
  (value: LoginParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: 'loading' }));

      const {
        data: { resultCode, messages },
      } = await authAPI.login(value);

      if (resultCode === ResultCode.success) {
        dispatch(setIsLoggedIn({ isLoginIn: true }));
      } else {
        handleServerAppError(messages, dispatch);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      handleServerNetworkError(dispatch, message);
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }));
    }
  };

export const logoutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus({ status: 'loading' }));

    const {
      data: { resultCode, messages },
    } = await authAPI.logout();

    if (resultCode === ResultCode.success) {
      dispatch(setIsLoggedIn({ isLoginIn: false }));
    } else {
      handleServerAppError(messages, dispatch);
    }
  } catch (error) {
    const { message } = error as AxiosError;

    handleServerNetworkError(dispatch, message);
  } finally {
    dispatch(setAppStatus({ status: 'succeeded' }));
  }
};
