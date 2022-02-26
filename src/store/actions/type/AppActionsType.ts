import { Dispatch } from 'redux';

import { setAppError, setAppStatus, setIsInitialized } from 'store/actions';

export type setAppStatusType = ReturnType<typeof setAppStatus>;
export type setAppErrorType = ReturnType<typeof setAppError>;
export type setIsInitializedType = ReturnType<typeof setIsInitialized>;

export type AppActionsType = setAppStatusType | setAppErrorType | setIsInitializedType;

export type ErrorUtilsDispatchType = Dispatch<setAppErrorType | setAppStatusType>;
