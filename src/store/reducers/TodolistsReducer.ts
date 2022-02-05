import { TODOLIST_ACTIONS } from 'store/actions';
import { TodoListsType } from 'types';
import { TodoActionType } from 'types/actions';

const initialState: TodoListsType[] = [];

export const TodoListsReducer = (
  state = initialState,
  action: TodoActionType,
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
      return [
        {
          id: action.payload.todolistId,
          title: action.payload.title,
          filter: 'all',
        },
        ...state,
      ];
    case TODOLIST_ACTIONS.RENAME:
      return state.map(tl =>
        tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl,
      );
    default:
      return state;
  }
};
