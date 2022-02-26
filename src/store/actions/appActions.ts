import { RequestStatusType } from 'types';

export enum APP_ACTIONS {
  SET_STATUS = 'APP_SET-STATUS',
  SET_ERROR = 'APP_SET-ERROR',
  SET_INITIALIZED = 'APP_INITIALIZED',
}
export const setAppStatus = (status: RequestStatusType) =>
  ({
    type: APP_ACTIONS.SET_STATUS,
    payload: {
      status,
    },
  } as const);

export const setAppError = (error: string | null) =>
  ({
    type: APP_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  } as const);

export const setIsInitialized = (initialized: boolean) =>
  ({
    type: APP_ACTIONS.SET_INITIALIZED,
    payload: {
      initialized,
    },
  } as const);
