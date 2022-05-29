import { AxiosResponse } from 'axios';

import { GetTasksResponse, instance, ResponseType } from 'api';
import { pathApi } from 'const';
import { TaskType } from 'types';

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(pathApi.tasks({ todolistId }));
  },

  creatTask(todolistId: string, title: string) {
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(pathApi.tasks({ todolistId }), { title });
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(pathApi.task({ todolistId, taskId }));
  },

  updateTask(model: TaskType) {
    return instance.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      Partial<TaskType>
    >(pathApi.task({ todolistId: model.todoListId, taskId: model.id }), model);
  },
};
