import { RequestStatusType } from 'types';

export enum APP_ACTIONS {
  SET_STATUS = 'APP_SET-STATUS',
  SET_ERROR = 'APP_SET-ERROR',
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
