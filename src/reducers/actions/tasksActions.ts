import {addTodoListType, removeTodolistType} from "./todolistsActions";

export enum TASK_ACTIONS_TYPE {
    REMOVE = "REMOVE",
    CHANGE_STATUS = "CHANGE_STATUS",
    RENAME = "RENAME",
    ADD = "ADD",
}


export type TasksActionType =
    addTaskType
    | removeTaskType
    | changeStatusType
    | renameTaskType
    | addTodoListType
    | removeTodolistType

type addTaskType = ReturnType<typeof addTask>
type removeTaskType = ReturnType<typeof removeTask>
type changeStatusType = ReturnType<typeof changeStatus>
type renameTaskType = ReturnType<typeof renameTask>

export const addTask = (todolistId: string, title: string) => {
    return {
        type: TASK_ACTIONS_TYPE.ADD,
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}

export const removeTask = (todolistId: string, taskId: string) => {
    return {
        type: TASK_ACTIONS_TYPE.REMOVE,
        payload: {
            todolistId: todolistId,
            taskId: taskId
        }
    } as const
}
export const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: TASK_ACTIONS_TYPE.CHANGE_STATUS,
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            isDone: isDone
        }
    } as const
}
export const renameTask = (todolistId: string, taskId: string, title: string) => {
    return {
        type: TASK_ACTIONS_TYPE.RENAME,
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            title: title
        }
    } as const
}