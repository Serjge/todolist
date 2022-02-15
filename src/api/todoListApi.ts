import { AxiosResponse } from 'axios';

import { ResponseType, instance } from 'api';
import { TodoListsType } from 'types';

export const todolistAPI = {
  getTodoList() {
    return instance.get<TodoListsType[]>('todo-lists');
  },

  createTodoList(title: string) {
    return instance.post<
      ResponseType<{ item: TodoListsType }>,
      AxiosResponse<ResponseType<{ item: TodoListsType }>>,
      { title: string }
    >('todo-lists', { title });
  },

  deleteTodoList(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  updateTodoList(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
};
