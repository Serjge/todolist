import {v1} from "uuid";

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

export const todolistID1 = v1();
export const todolistID2 = v1();

let initialState:TodoListsType[] =[
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]


export const TodoListsReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.value}
                : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            const newTodoList: TodoListsType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodoList, ...state]
        case "RENAME-TODOLIST":
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title}
                : tl)
        default:
            return state
    }
}

type ActionType = changeFilterACType | removeTodolistACType | addTodoListACType | renameTodoListACType

export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type renameTodoListACType = ReturnType<typeof renameTodoListAC>

export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId: todolistId,
            value: value
        }
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId,
        }
    } as const
}
export const addTodoListAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}
export const renameTodoListAC = (todolistId: string, title: string) => {
    return {
        type: 'RENAME-TODOLIST',
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}
