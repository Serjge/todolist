import { arrayElement, TaskPriorities, TaskStatuses, amountOfElements } from 'enum';
import {
  tasksReducer,
  removeTask,
  changeTask,
  addTodoList,
  removeTodolist,
  addTask,
  setTasks,
} from 'store/reducers';
import { TasksType, TodoListsType } from 'types';

let startState: TasksType;

beforeEach(() => {
  startState = {
    '1': [
      {
        description: '',
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        id: '1',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        description: '',
        title: 'JS',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        id: '2',
        todoListId: '1',
        order: -1,
        addedDate: '',
      },
    ],
  };
});

test('remove task', () => {
  const deleteTask = tasksReducer(
    startState,
    removeTask({ todolistId: '1', taskId: '2' }),
  );

  expect(deleteTask['1'][arrayElement.null].id).toBe('1');
  expect(deleteTask['1'].length).toBe(amountOfElements.one);
});

test('change isDone task', () => {
  const updateTask = {
    description: '',
    title: 'JS',
    status: TaskStatuses.Completed,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    id: '2',
    todoListId: '1',
    order: -1,
    addedDate: '',
  };

  const isDoneTask = tasksReducer(startState, changeTask({ task: updateTask }));

  expect(isDoneTask['1'][arrayElement.first].status).toBe(TaskStatuses.Completed);
  expect(isDoneTask['1'][arrayElement.first].title).toBe('JS');
});

test('update title task', () => {
  const updateTask = {
    description: '',
    title: 'Test',
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    id: '2',
    todoListId: '1',
    order: -1,
    addedDate: '',
  };

  const renameTask = tasksReducer(startState, changeTask({ task: updateTask }));

  expect(renameTask['1'][arrayElement.first].title).toBe('Test');
  expect(renameTask['1'][arrayElement.first].status).toBe(TaskStatuses.New);
});

test('add todolist', () => {
  const newTodolist: TodoListsType = {
    id: '2',
    title: 'New',
    addedDate: '',
    order: -1,
    filter: 'all',
    priority: TaskPriorities.Low,
    entityStatus: 'idle',
  };

  const addTodolist = tasksReducer(startState, addTodoList({ todoList: newTodolist }));

  expect(addTodolist['2'].length).toBe(amountOfElements.zero);
});

test('remove todolist', () => {
  const deleteTodolist = tasksReducer(startState, removeTodolist({ todolistId: '1' }));

  expect(deleteTodolist['1']).toBe(undefined);
});

test('add task', () => {
  const newTask = {
    description: '',
    title: 'ReactJS',
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    id: '3',
    todoListId: '1',
    order: -2,
    addedDate: '',
  };

  const addedTask = tasksReducer(startState, addTask({ task: newTask }));

  expect(addedTask['1'][arrayElement.second].title).toBe('ReactJS');
  expect(addedTask['1'][arrayElement.null].status).toBe(TaskStatuses.New);
  expect(addedTask['1'].length).toBe(amountOfElements.three);
});

test('set tasks', () => {
  const serverTasks = [
    {
      description: '',
      title: 'HTML&CSS',
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      id: '1',
      todoListId: '1',
      order: 0,
      addedDate: '',
    },
    {
      description: '',
      title: 'JS',
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      id: '2',
      todoListId: '1',
      order: -1,
      addedDate: '',
    },
  ];

  const setTasksState = tasksReducer(
    startState,
    setTasks({ todoListId: '2', tasks: serverTasks }),
  );

  expect(setTasksState['1'][arrayElement.first].title).toBe('JS');
  expect(setTasksState['1'][arrayElement.null].status).toBe(TaskStatuses.New);
  expect(setTasksState['1'].length).toBe(amountOfElements.two);
});
