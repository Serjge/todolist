import { v1 } from 'uuid';

import { TASK_ACTIONS, TODOLIST_ACTIONS } from 'store/actions';
import { TasksType } from 'types';
import { TasksActionType } from 'types/actions';

const initialState: TasksType = {};

export const TasksReducer = (
  state = initialState,
  action: TasksActionType,
): TasksType => {
  switch (action.type) {
    case TASK_ACTIONS.ADD:
      return {
        ...state,
        [action.payload.todolistId]: [
          { id: v1(), title: action.payload.title, isDone: false },
          ...state[action.payload.todolistId],
        ],
      };
    case TASK_ACTIONS.REMOVE:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          t => t.id !== action.payload.taskId,
        ),
      };
    case TASK_ACTIONS.CHANGE_STATUS:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
        ),
      };
    case TASK_ACTIONS.RENAME:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
        ),
      };
    case TODOLIST_ACTIONS.REMOVE:
      // const newState = { ...state };
      // delete newState[action.payload.todolistId];
      // return newState;
      return state;
    case TODOLIST_ACTIONS.ADD:
      return { ...state, [action.payload.todolistId]: [] };
    default:
      return state;
  }
};
