import { TaskPriorities } from 'enum';
import { TODOLIST_ACTIONS, TodoListActionType } from 'store/actions';
import { TodoListsType } from 'types';

const initialState: TodoListsType[] = [];

export const todoListsReducer = (
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
          entityStatus: 'idle',
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
        entityStatus: 'idle',
      }));

    case TODOLIST_ACTIONS.CHANGE_ENTITY_STATUS:
      return state.map(tl =>
        tl.id === action.payload.todolistId
          ? { ...tl, entityStatus: action.payload.entityStatus }
          : tl,
      );

    default:
      return state;
  }
};
