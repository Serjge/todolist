import { AUTH_ACTIONS, AuthActionsType } from 'store/actions';
import { AuthInitialType } from 'types';

const initialState: AuthInitialType = {
  isLoginIn: false,
};

export const authReducer = (
  state = initialState,
  action: AuthActionsType,
): AuthInitialType => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_IS_LOGGED_IN:
      return { ...state, isLoginIn: action.payload.isLoginIn };
    default:
      return state;
  }
};
