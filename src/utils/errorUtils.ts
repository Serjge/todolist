import { Dispatch } from 'redux';

import { ResponseType } from 'api';
import { arrayElement } from 'enum';
import {
  AppActionsType,
  setAppError,
  setAppStatus,
  ErrorUtilsDispatchType,
} from 'store/actions';

export const handleServerNetworkError = (
  dispatch: Dispatch<AppActionsType>,
  message: string,
): void => {
  dispatch(setAppError(message));
};

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[arrayElement.null]));
  } else {
    dispatch(setAppError('Some error occurred'));
  }
  dispatch(setAppStatus('failed'));
};
