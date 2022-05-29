import { AxiosResponse } from 'axios';

import { ResponseType, instance } from 'api';
import { pathApi } from 'const';
import { TodoListsType } from 'types';

export const todolistAPI = {
  getTodoList() {
    return instance.get<TodoListsType[]>(pathApi.todolists());
  },

  createTodoList(title: string) {
    return instance.post<
      ResponseType<{ item: TodoListsType }>,
      AxiosResponse<ResponseType<{ item: TodoListsType }>>,
      { title: string }
    >(pathApi.todolists(), { title });
  },

  deleteTodoList(todolistId: string) {
    return instance.delete<ResponseType>(pathApi.todolist({ todolistId }));
  },

  updateTodoList(todolistId: string, title: string) {
    return instance.put<ResponseType>(pathApi.todolist({ todolistId }), { title });
  },
};
