import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { TasksReducer, TodoListsReducer } from 'store/reducers';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todoList: TodoListsReducer,
});

export type rootReducerType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
export const useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector;
