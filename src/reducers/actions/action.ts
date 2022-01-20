export default ()=>{};
// export enum ACTIONS_TYPE {
//     //task action
//     TASK_REMOVE = "TASK_REMOVE",
//     TASK_CHANGE_STATUS= "TASK_CHANGE_STATUS",
//     TASK_RENAME = "TASK_RENAME",
//
//     //todolist action
//     TODOLIST_REMOVE = "TODOLIST_REMOVE",
//     TODOLIST_ADD_ = "TODOLIST_ADD_",
//     TODOLIST_CHANGE = "TODOLIST_CHANGE",
//     TODOLIST_RENAME = "TODOLIST_RENAME",
// }

// export default {
//     ...TaskAC,
//     ...TodoAC
// }
//
// export type TasksActionType =
//     addTaskACType
//     | removeTaskACType
//     | changeStatusACType
//     | renameTaskACType
//     | addTodoListACType
//     | removeTodolistACType
//
// type addTaskACType = ReturnType<typeof addTaskAC>
// type removeTaskACType = ReturnType<typeof removeTaskAC>
// type changeStatusACType = ReturnType<typeof changeStatusAC>
// type renameTaskACType = ReturnType<typeof renameTaskAC>

// export const addTaskAC = (todolistId: string, title: string) => {
//     return {
//         type:ACTIONS_TYPE.,
//         payload: {
//             todolistId: todolistId,
//             title: title
//         }
//     } as const
// }
//
// export const removeTaskAC = (todolistId: string, taskId: string) => {
//     return {
//         type: ACTIONS_TYPE.REMOVE_TASK,
//         payload: {
//             todolistId: todolistId,
//             taskId: taskId
//         }
//     } as const
// }
// export const changeStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
//     return {
//         type: "CHANGE-STATUS-TASK",
//         payload: {
//             todolistId: todolistId,
//             taskId: taskId,
//             isDone: isDone
//         }
//     } as const
// }
// export const renameTaskAC = (todolistId: string, taskId: string, title: string) => {
//     return {
//         type: "RENAME-TASK",
//         payload: {
//             todolistId: todolistId,
//             taskId: taskId,
//             title: title
//         }
//     } as const
// }

//
// export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
//     return {
//         type: 'CHANGE-FILTER',
//         payload: {
//             todolistId: todolistId,
//             value: value
//         }
//     } as const
// }
// export const removeTodolistAC = (todolistId: string) => {
//     return {
//         type: 'REMOVE-TODOLIST',
//         payload: {
//             todolistId: todolistId,
//         }
//     } as const
// }
// export const addTodoListAC = (todolistId: string, title: string) => {
//     return {
//         type: 'ADD-TODOLIST',
//         payload: {
//             todolistId: v1(),
//             title: title
//         }
//     } as const
// }
// export const renameTodoListAC = (todolistId: string, title: string) => {
//     return {
//         type: 'RENAME-TODOLIST',
//         payload: {
//             todolistId: todolistId,
//             title: title
//         }
//     } as const
// }
