import {FilterValuesType} from "../TodolistsReducer";
import {v1} from "uuid";

export enum TODOLIST_ACTIONS_TYPE {
    REMOVE = "Todolist/REMOVE",
    ADD = "Todolist/ADD",
    CHANGE_FILTER = "Todolist/CHANGE_FILTER",
    RENAME = "Todolist/RENAME",
}

export type TodoActionType = changeFilterTodolistType | removeTodolistType | addTodoListType | renameTodoListType

export type changeFilterTodolistType = ReturnType<typeof changeFilterTodolist>
export type removeTodolistType = ReturnType<typeof removeTodolist>
export type addTodoListType = ReturnType<typeof addTodoList>
export type renameTodoListType = ReturnType<typeof renameTodoList>



export const changeFilterTodolist = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: TODOLIST_ACTIONS_TYPE.CHANGE_FILTER,
        payload: {
            todolistId: todolistId,
            filter: filter
        }
    } as const
}
export const removeTodolist = (todolistId: string) => {
    return {
        type: TODOLIST_ACTIONS_TYPE.REMOVE,
        payload: {
            todolistId: todolistId,
        }
    } as const
}
export const addTodoList = (todolistId: string, title: string) => {
    return {
        type: TODOLIST_ACTIONS_TYPE.ADD,
        payload: {
            todolistId: v1(),
            title: title
        }
    } as const
}
export const renameTodoList = (todolistId: string, title: string) => {
    return {
        type: TODOLIST_ACTIONS_TYPE.RENAME,
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}