import { Dispatch } from 'redux';

import { setAppError, setAppStatus } from 'store/actions';

export type setAppStatusType = ReturnType<typeof setAppStatus>;
export type setAppErrorType = ReturnType<typeof setAppError>;

export type AppActionsType = setAppStatusType | setAppErrorType;

export type ErrorUtilsDispatchType = Dispatch<setAppErrorType | setAppStatusType>;
