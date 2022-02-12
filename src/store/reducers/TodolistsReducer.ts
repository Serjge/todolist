import { TaskPriorities } from 'enum';
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
      return state.map(todolist =>
        todolist.id === action.payload.todolistId
          ? { ...todolist, filter: action.payload.filter }
          : todolist,
      );

    case TODOLIST_ACTIONS.REMOVE:
      return state.filter(({ id }) => id !== action.payload.todolistId);

    case TODOLIST_ACTIONS.ADD:
      return [
        {
          ...action.payload.todoList,
          filter: 'all',
          priority: TaskPriorities.Low,
        },
        ...state,
      ];

    case TODOLIST_ACTIONS.RENAME:
      return state.map(todolist =>
        todolist.id === action.payload.todolistId
          ? { ...todolist, title: action.payload.title }
          : todolist,
      );

    case TODOLIST_ACTIONS.SET:
      return action.payload.todolistData.map(todolist => ({
        ...todolist,
        filter: 'all',
        priority: TaskPriorities.Low,
      }));

    default:
      return state;
  }
};
