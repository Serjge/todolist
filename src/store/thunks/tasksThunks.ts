import { taskAPI } from 'api';
import { rootReducerType } from 'store';
import { addTask, changeTask, removeTask, setTasks } from 'store/actions';
import { selectTask } from 'store/selectors';
import { AppThunkType } from 'store/thunks';
import { TaskType } from 'types';

export const getTasksTC =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await taskAPI.getTasks(todolistId);
      dispatch(setTasks(todolistId, res.data.items));
    } catch (e) {
      throw Error('error getTasksTC');
    }
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await taskAPI.creatTask(todolistId, title);
      dispatch(addTask(res.data.data.item));
    } catch (e) {
      throw Error('error addTaskTC');
    }
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  async dispatch => {
    try {
      await taskAPI.deleteTask(todolistId, taskId);
      dispatch(removeTask(todolistId, taskId));
    } catch (e) {
      throw Error('error removeTaskTC');
    }
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, change: Partial<TaskType>): AppThunkType =>
  async (dispatch, getState: () => rootReducerType) => {
    try {
      // const task = getState().tasks[todolistId].find(t => t.id === taskId) as TaskType;
      const task = selectTask(getState(), todolistId, taskId) as TaskType;
      await taskAPI.updateTask({ ...task, ...change });
      dispatch(changeTask({ ...task, ...change }));
    } catch (e) {
      throw Error('error updateTaskTC');
    }
  };
