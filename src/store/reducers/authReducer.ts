import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthInitialType } from 'types';

const initialState: AuthInitialType = {
  isLoginIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoginIn: boolean }>) {
      state.isLoginIn = action.payload.isLoginIn;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedIn } = slice.actions;
