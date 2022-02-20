import { ThunkAction } from 'redux-thunk';

import { rootReducerType } from 'store';
import { ActionsType } from 'store/actions';

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  rootReducerType,
  unknown,
  ActionsType
>;
