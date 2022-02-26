import {
  AppActionsType,
  TasksActionType,
  TodoListActionType,
  AuthActionsType,
} from 'store/actions';

export type ActionsType =
  | TodoListActionType
  | TasksActionType
  | AppActionsType
  | AuthActionsType;
