import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { tasksReducer, todoListsReducer, appReducer, authReducer } from 'store/reducers';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoList: todoListsReducer,
  app: appReducer,
  auth: authReducer,
});

export type rootReducerType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector;
