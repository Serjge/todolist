import { TASK_ACTIONS, TODOLIST_ACTIONS } from 'store/actions';
import { TasksType } from 'types';
import { TasksActionType } from 'types/actions';

const initialState: TasksType = {};

export const TasksReducer = (
  state = initialState,
  action: TasksActionType,
): TasksType => {
  const copyState = { ...state };
  switch (action.type) {
    case TASK_ACTIONS.ADD:
      return state;
    // {
    //     ...state,
    //     [action.payload.todolistId]: [
    //       { id: v1(), title: action.payload.title, isDone:  },
    //       ...state[action.payload.todolistId],
    //     ],
    //   };
    case TASK_ACTIONS.REMOVE:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          ({ id }) => id !== action.payload.taskId,
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
      delete copyState[action.payload.todolistId];
      return copyState;
    case TODOLIST_ACTIONS.SET:
      action.payload.todolistData.forEach(tl => {
        copyState[tl.id] = [];
      });
      return copyState;
    case TODOLIST_ACTIONS.ADD:
      return { ...state, [action.payload.todoList.id]: [] };
    default:
      return state;
  }
};
