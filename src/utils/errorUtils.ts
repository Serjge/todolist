import { Dispatch } from 'redux';

import { arrayElement } from 'enum';
import { AppActionsType, ErrorUtilsDispatchType } from 'store/actions';
import { setAppError, setAppStatus } from 'store/reducers';

export const handleServerNetworkError = (
  dispatch: Dispatch<AppActionsType>,
  message: string,
): void => {
  dispatch(setAppError({ error: message }));
};

export const handleServerAppError = (
  messages: Array<string>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (messages.length) {
    dispatch(setAppError({ error: messages[arrayElement.null] }));
  } else {
    dispatch(setAppError({ error: 'Some error occurred' }));
  }
  dispatch(setAppStatus({ status: 'failed' }));
};
