import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { TasksReducer, TodoListsReducer } from 'store/reducers';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todoList: TodoListsReducer,
});

export type rootReducerType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector;
