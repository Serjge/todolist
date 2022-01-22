import {v1} from "uuid";
import {FilterValuesType} from "../reducers/TodolistsReducer";

export enum TODOLIST_ACTIONS_TYPE {
    TL_REMOVE = "TL_REMOVE",
    TL_ADD = "TL_ADD",
    CHANGE_FILTER = "CHANGE_FILTER",
    RENAME = "RENAME",
}


export type ActionType = changeFilterType | removeTodolistType | addTodoListType | renameTodoListType

export type changeFilterType = ReturnType<typeof changeFilterTodolist>
export type removeTodolistType = ReturnType<typeof removeTodolist>
export type addTodoListType = ReturnType<typeof addTodoList>
export type renameTodoListType = ReturnType<typeof renameTodoList>

export const addTodoList = (title: string) => {
    return {
        type: TODOLIST_ACTIONS_TYPE.TL_ADD,
        payload: {
            todolistId: v1(),
            title: title
        }
    } as const
}
export const removeTodolist = (todolistId: string) => {
    return {
        type: TODOLIST_ACTIONS_TYPE.TL_REMOVE,
        payload: {
            todolistId: todolistId,
        }
    } as const
}
export const changeFilterTodolist = (todolistId: string, value: FilterValuesType) => {
    return {
        type: TODOLIST_ACTIONS_TYPE.CHANGE_FILTER,
        payload: {
            todolistId: todolistId,
            value: value
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
