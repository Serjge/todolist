import {TasksReducer} from "../reducers/TasksReducer";
import {TodoListsReducer} from "../reducers/TodolistsReducer";
import {combineReducers, createStore} from "redux";

let rootReducer=combineReducers({
    tasks: TasksReducer,
    todoList: TodoListsReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export let store=createStore(rootReducer)