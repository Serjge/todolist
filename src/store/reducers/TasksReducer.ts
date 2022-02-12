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
      copyState[action.payload.task.todoListId] = [
        action.payload.task,
        ...copyState[action.payload.task.todoListId],
      ];
      return copyState;

    case TASK_ACTIONS.REMOVE:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          ({ id }) => id !== action.payload.taskId,
        ),
      };

    case TASK_ACTIONS.CHANGE:
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId].map(
          task => (task.id === action.payload.task.id ? action.payload.task : task),
        ),
      };

    case TODOLIST_ACTIONS.REMOVE:
      delete copyState[action.payload.todolistId];
      return copyState;

    case TODOLIST_ACTIONS.SET:
      action.payload.todolistData.forEach(({ id }) => {
        copyState[id] = [];
      });
      return copyState;

    case TODOLIST_ACTIONS.ADD:
      return { ...state, [action.payload.todoList.id]: [] };

    case TASK_ACTIONS.SET:
      copyState[action.payload.todoListId] = action.payload.tasks;
      return copyState;

    default:
      return state;
  }
};
