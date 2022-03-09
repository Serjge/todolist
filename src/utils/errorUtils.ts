import { Dispatch } from 'redux';

import { ResponseType } from 'api';
import { arrayElement } from 'enum';
import { AppActionsType, ErrorUtilsDispatchType } from 'store/actions';
import { setAppError, setAppStatus } from 'store/reducers/appReducer';

export const handleServerNetworkError = (
  dispatch: Dispatch<AppActionsType>,
  message: string,
): void => {
  dispatch(setAppError({ error: message }));
};

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[arrayElement.null] }));
  } else {
    dispatch(setAppError({ error: 'Some error occurred' }));
  }
  dispatch(setAppStatus({ status: 'failed' }));
};
