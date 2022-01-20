import {TasksReducer} from "../reducers/TasksReducer";
import {TodoListsReducer} from "../reducers/TodolistsReducer";
import {combineReducers, createStore} from "redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";

let rootReducer=combineReducers({
    tasks: TasksReducer,
    todoList: TodoListsReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export let store=createStore(rootReducer)

export let useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector