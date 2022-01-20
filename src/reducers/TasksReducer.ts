import {v1} from "uuid";
import {todolistID1, todolistID2} from "./TodolistsReducer";
import {TASK_ACTIONS_TYPE, TasksActionType} from "./actions/tasksActions";
import {TODOLIST_ACTIONS_TYPE} from "./actions/todolistsActions";

export type TasksStateType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

let initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}

export const TasksReducer = (state = initialState, action: TasksActionType) => {
    switch (action.type) {
        case TASK_ACTIONS_TYPE.ADD:
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case TASK_ACTIONS_TYPE.REMOVE:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case TASK_ACTIONS_TYPE.CHANGE_STATUS:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, isDone: action.payload.isDone}
                        : t)
            }
        case TASK_ACTIONS_TYPE.RENAME:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        case TODOLIST_ACTIONS_TYPE.REMOVE:
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        case TODOLIST_ACTIONS_TYPE.ADD:
            return {...state, [action.payload.todolistId]: []}
        default:
            return state
    }
}
