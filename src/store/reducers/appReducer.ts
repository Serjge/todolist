import { APP_ACTIONS, AppActionsType } from 'store/actions';
import { AppType } from 'types';

const initialState: AppType = {
  status: 'idle',
  error: null,
  isInitialized: false,
};

export const appReducer = (state = initialState, action: AppActionsType): AppType => {
  switch (action.type) {
    case APP_ACTIONS.SET_STATUS:
      return { ...state, status: action.payload.status };
    case APP_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload.error };
    case APP_ACTIONS.SET_INITIALIZED:
      return { ...state, isInitialized: action.payload.initialized };
    default:
      return state;
  }
};
