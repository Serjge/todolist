import { useState } from 'react';

import { shallowEqual, useSelector } from 'react-redux';

import { TaskStatuses } from 'enum';
import { rootReducerType } from 'store';
import { selectTasks, selectTodoListFilter } from 'store/selectors';
import { FilterValuesType, TaskType } from 'types';

export const filterTasks = (
  tasks2: TaskType[],
  filter2: FilterValuesType,
): TaskType[] => {
  const filters: { [key: string]: TaskType[] } = {
    active: tasks2.filter(({ status }) => status === TaskStatuses.New),
    completed: tasks2.filter(({ status }) => status === TaskStatuses.Completed),
    all: tasks2,
  };
  return filters[filter2];
};

const EMPTY_ARRAY = 0;

type UseGetFilteredTasksReturnType = {
  tasks: TaskType[];
  isTasks: boolean;
};

export const UseGetFilteredTasks = (
  todolistId: string,
): UseGetFilteredTasksReturnType => {
  const tasks = useSelector(
    (state: rootReducerType) => selectTasks(state, todolistId),
    shallowEqual,
  );
  const filter = useSelector(
    (state: rootReducerType) => selectTodoListFilter(state, todolistId),
    shallowEqual,
  );

  const [isTasks, setIsTasks] = useState(true);

  const filteredTask = filterTasks(tasks, filter);

  if (filteredTask.length === EMPTY_ARRAY && isTasks) {
    setIsTasks(false);
  }

  return { isTasks, tasks: filteredTask };
};
