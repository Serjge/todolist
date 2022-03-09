import { setIsLoggedIn } from 'store/reducers/authReducer';

export type AuthActionsType = setIsLoggedInType;

export type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>;
