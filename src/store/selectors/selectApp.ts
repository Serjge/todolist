import { rootReducerType } from 'store/store';

export const selectStatus = (state: rootReducerType): string => state.app.status;

export const selectError = (state: rootReducerType): string | null => state.app.error;

export const selectIsInitialized = (state: rootReducerType): boolean =>
  state.app.isInitialized;
