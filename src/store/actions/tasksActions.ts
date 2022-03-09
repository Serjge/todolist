export enum TASK_ACTIONS {
  REMOVE = 'TASK_REMOVE',
  CHANGE = 'TASK_CHANGE',
  ADD = 'TASK_ADD',
  SET = 'TASK_SET',
}

// export const addTask = (task: TaskType) =>
//   ({
//     type: TASK_ACTIONS.ADD,
//     payload: {
//       task,
//     },
//   } as const);
//
// export const removeTask = (todolistId: string, taskId: string) =>
//   ({
//     type: TASK_ACTIONS.REMOVE,
//     payload: {
//       todolistId,
//       taskId,
//     },
//   } as const);
//
// export const setTasks = (todoListId: string, tasks: TaskType[]) =>
//   ({
//     type: TASK_ACTIONS.SET,
//     payload: {
//       todoListId,
//       tasks,
//     },
//   } as const);
//
// export const changeTask = (task: TaskType) =>
//   ({
//     type: TASK_ACTIONS.CHANGE,
//     payload: {
//       task,
//     },
//   } as const);
