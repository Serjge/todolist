import { AppActionsType, APP_ACTIONS } from 'store/actions';
import { AppType } from 'types';

const initialState: AppType = {
  status: 'idle',
  error: null,
};

export const appReducer = (state = initialState, action: AppActionsType): AppType => {
  switch (action.type) {
    case APP_ACTIONS.SET_STATUS:
      return { ...state, status: action.payload.status };
    case APP_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
