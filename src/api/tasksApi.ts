import { AxiosResponse } from 'axios';

import { instance } from 'api';
import { GetTasksResponse, ResponseType, TaskType, TodoListsType } from 'types';

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },

  creatTask(todolistId: string, title: string) {
    return instance.post<
      ResponseType<{ item: TodoListsType }>,
      AxiosResponse<ResponseType<{ item: TodoListsType }>>,
      { title: string }
    >(`/todo-lists/${todolistId}/tasks)`, { title });
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(` /todo-lists/${todolistId}/tasks/${taskId}`);
  },

  updateTask(model: Partial<TaskType>) {
    return instance.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<Partial<TaskType>>>,
      Partial<TaskType>
    >(` /todo-lists/${model.todoListId}/tasks/${model.id}`, model);
  },
};
