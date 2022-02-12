import { TaskPriorities, TaskStatuses } from 'enum';
import { TODOLIST_ACTIONS } from 'store/actions';
import { TodoListsType } from 'types';
import { TodoListActionType } from 'types/actions';

const initialState: TodoListsType[] = [];

export const TodoListsReducer = (
  state = initialState,
  action: TodoListActionType,
): TodoListsType[] => {
  switch (action.type) {
    case TODOLIST_ACTIONS.CHANGE_FILTER:
      return state.map(tl =>
        tl.id === action.payload.todolistId
          ? { ...tl, filter: action.payload.filter }
          : tl,
      );
    case TODOLIST_ACTIONS.REMOVE:
      return state.filter(tl => tl.id !== action.payload.todolistId);
    case TODOLIST_ACTIONS.ADD:
      return [{ ...action.payload.todoList }, ...state];
    case TODOLIST_ACTIONS.RENAME:
      return state.map(tl =>
        tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl,
      );
    case TODOLIST_ACTIONS.SET:
      return action.payload.todolistData.map(tl => ({
        ...tl,
        filter: TaskStatuses.New,
        priority: TaskPriorities.Low,
      }));
    default:
      return state;
  }
};
