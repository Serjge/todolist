import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppType, RequestStatusType } from 'types';

const initialState: AppType = {
  status: 'idle',
  error: null,
  isInitialized: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setIsInitialized(state, action: PayloadAction<{ initialized: boolean }>) {
      state.isInitialized = action.payload.initialized;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setIsInitialized, setAppError } = slice.actions;
