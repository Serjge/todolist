import { setIsLoggedIn } from 'store/actions';

export type AuthActionsType = setIsLoggedInType;

export type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>;
