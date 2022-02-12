import { taskAPI } from 'api';
import { addTask, changeTask, removeTask, setTasks } from 'store/actions';
import { rootReducerType } from 'store/store';
import { AppThunkType, TaskType } from 'types';

export const getTasksTC =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    const res = await taskAPI.getTasks(todolistId);
    dispatch(setTasks(todolistId, res.data.items));
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunkType =>
  async dispatch => {
    const res = await taskAPI.creatTask(todolistId, title);
    dispatch(addTask(res.data.data.item));
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  async dispatch => {
    await taskAPI.deleteTask(todolistId, taskId);
    dispatch(removeTask(todolistId, taskId));
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, change: Partial<TaskType>): AppThunkType =>
  async (dispatch, getState: () => rootReducerType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId) as TaskType;

    if (task) {
      await taskAPI.updateTask({ ...task, ...change });
      dispatch(changeTask({ ...task, ...change }));
    }
  };
