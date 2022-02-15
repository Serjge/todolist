import { ThunkAction } from 'redux-thunk';

import { rootReducerType } from 'store';
import { AppActionsType } from 'store/actions';

export type AppThunkType = ThunkAction<void, rootReducerType, unknown, AppActionsType>;
