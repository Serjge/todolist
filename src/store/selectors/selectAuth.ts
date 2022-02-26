import { rootReducerType } from 'store/store';

export const selectIsLoginIn = (state: rootReducerType): boolean => state.auth.isLoginIn;
