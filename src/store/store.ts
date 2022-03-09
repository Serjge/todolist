import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { tasksReducer, todoListsReducer, appReducer, authReducer } from 'store/reducers';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoList: todoListsReducer,
  app: appReducer,
  auth: authReducer,
});

export type rootReducerType = ReturnType<typeof rootReducer>;

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

export const useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector;
