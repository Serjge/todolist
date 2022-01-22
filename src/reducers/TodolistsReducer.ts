import {ActionType, TODOLIST_ACTIONS_TYPE} from "../action/todolistAction";

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

let initialState:TodoListsType[] =[
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]


export const TodoListsReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case TODOLIST_ACTIONS_TYPE.CHANGE_FILTER:
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.value}
                : tl)
        case TODOLIST_ACTIONS_TYPE.TL_REMOVE:
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case TODOLIST_ACTIONS_TYPE.TL_ADD:
            const newTodoList: TodoListsType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodoList, ...state]
        case TODOLIST_ACTIONS_TYPE.RENAME:
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title}
                : tl)
        default:
            return state
    }
}
//
// type ActionType = changeFilterType | removeTodolistType | addTodoListType | renameTodoListType
//
// export type changeFilterType = ReturnType<typeof changeFilterTodolist>
// export type removeTodolistType = ReturnType<typeof removeTodolist>
// export type addTodoListType = ReturnType<typeof addTodoList>
// export type renameTodoListType = ReturnType<typeof renameTodoList>
//
// export const changeFilterTodolist = (todolistId: string, value: FilterValuesType) => {
//     return {
//         type: 'CHANGE-FILTER',
//         payload: {
//             todolistId: todolistId,
//             value: value
//         }
//     } as const
// }
// export const removeTodolist = (todolistId: string) => {
//     return {
//         type: 'REMOVE-TODOLIST',
//         payload: {
//             todolistId: todolistId,
//         }
//     } as const
// }
// export const addTodoList = (title: string) => {
//     return {
//         type: 'ADD-TODOLIST',
//         payload: {
//             todolistId: v1(),
//             title: title
//         }
//     } as const
// }
// export const renameTodoList = (todolistId: string, title: string) => {
//     return {
//         type: 'RENAME-TODOLIST',
//         payload: {
//             todolistId: todolistId,
//             title: title
//         }
//     } as const
// }
