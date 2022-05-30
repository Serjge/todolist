import { ReactElement, useCallback } from 'react';

import { CircularProgress } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { AddItemForm } from 'components/common';
import { ButtonFilter } from 'components/containerTodolists/todoList/buttonFilter';
import { Task } from 'components/containerTodolists/todoList/task';
import style from 'components/containerTodolists/todoList/TodoList.module.css';
import { rootReducerType } from 'store';
import { selectTodoListEntityStatus } from 'store/selectors';
import { addTaskTC } from 'store/thunks';
import { UseGetFilteredTasks } from 'useGetFilteredTasks';

type TasksListPropsType = {
  todolistId: string;
};

export const TasksList = ({ todolistId }: TasksListPropsType): ReactElement => {
  const dispatch = useDispatch();

  const { tasks, isTasks } = UseGetFilteredTasks(todolistId);

  const entityStatus = useSelector(
    (state: rootReducerType) => selectTodoListEntityStatus(state, todolistId),
    shallowEqual,
  );

  const addTask = useCallback(
    (titleTask: string) => {
      dispatch(addTaskTC(todolistId, titleTask));
    },
    [todolistId],
  );

  const TasksRender = (): ReactElement | ReactElement[] => {
    if (entityStatus === 'idle') {
      return (
        <div className={style.loadingBar}>
          <CircularProgress />
        </div>
      );
    }

    if (isTasks) {
      return <span className={style.notFont}>Not fount task</span>;
    }

    return tasks.map(({ id }) => <Task taskId={id} todolistId={todolistId} key={id} />);
  };

  return (
    <>
      <AddItemForm label="Name task" addTask={addTask} />
      <div>{TasksRender()}</div>
      <div className={style.wrapperButtons}>
        <ButtonFilter todolistId={todolistId} title="All" filterName="all" />
        <ButtonFilter todolistId={todolistId} title="Active" filterName="active" />
        <ButtonFilter todolistId={todolistId} title="Completed" filterName="completed" />
      </div>
    </>
  );
};
