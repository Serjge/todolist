import { Ruty } from 'ruty';

import { GetTasksResponse, instance } from 'api';

const { route } = Ruty.configure();

export const pathApi = {
  tasks: route('todo-lists/:todolistId/tasks').build<{
    todolistId: string;
  }>(),
  task: route('todo-lists/:todolistId/tasks/:taskId').build<{
    todolistId: string;
    taskId: string;
  }>(),
  todolists: route('todo-lists/').build(),
  todolist: route('todo-lists/:todolistId').build<{
    todolistId: string;
  }>(),
  login: route('/auth/login').build(),
  me: route('/auth/me').build(),
};

export const taskApi4 = {
  getTasks4(todolistId: string) {
    return instance.get<GetTasksResponse>(pathApi.tasks({ todolistId }));
  },
};
