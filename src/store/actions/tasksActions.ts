export enum TASK_ACTIONS {
  REMOVE = 'Task/REMOVE',
  CHANGE_STATUS = 'Task/CHANGE_STATUS',
  RENAME = 'Task/RENAME',
  ADD = 'Task/ADD',
}

export const addTask = (todolistId: string, title: string) =>
  ({
    type: TASK_ACTIONS.ADD,
    payload: {
      todolistId,
      title,
    },
  } as const);

export const removeTask = (todolistId: string, taskId: string) =>
  ({
    type: TASK_ACTIONS.REMOVE,
    payload: {
      todolistId,
      taskId,
    },
  } as const);
export const changeStatus = (todolistId: string, taskId: string, isDone: boolean) =>
  ({
    type: TASK_ACTIONS.CHANGE_STATUS,
    payload: {
      todolistId,
      taskId,
      isDone,
    },
  } as const);
export const renameTask = (todolistId: string, taskId: string, title: string) =>
  ({
    type: TASK_ACTIONS.RENAME,
    payload: {
      todolistId,
      taskId,
      title,
    },
  } as const);
