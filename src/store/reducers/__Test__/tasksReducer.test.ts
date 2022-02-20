import { arrayElement, TaskPriorities, TaskStatuses, amountOfElements } from 'enum';
import { TASK_ACTIONS, TODOLIST_ACTIONS } from 'store/actions';
import { tasksReducer } from 'store/reducers';
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
  const removeTask = tasksReducer(startState, {
    type: TASK_ACTIONS.REMOVE,
    payload: { todolistId: '1', taskId: '2' },
  });

  expect(removeTask['1'][arrayElement.null].id).toBe('1');
  expect(removeTask['1'].length).toBe(amountOfElements.one);
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

  const isDoneTask = tasksReducer(startState, {
    type: TASK_ACTIONS.CHANGE,
    payload: { task: updateTask },
  });

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

  const renameTask = tasksReducer(startState, {
    type: TASK_ACTIONS.CHANGE,
    payload: { task: updateTask },
  });

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
  };

  const addTodolist = tasksReducer(startState, {
    type: TODOLIST_ACTIONS.ADD,
    payload: { todoList: newTodolist },
  });

  expect(addTodolist['2'].length).toBe(amountOfElements.zero);
});

test('remove todolist', () => {
  const removeTodolist = tasksReducer(startState, {
    type: TODOLIST_ACTIONS.REMOVE,
    payload: { todolistId: '1' },
  });

  expect(removeTodolist['1']).toBe(undefined);
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

  const addTask = tasksReducer(startState, {
    type: TASK_ACTIONS.ADD,
    payload: { task: newTask },
  });

  expect(addTask['1'][arrayElement.first].title).toBe('ReactJS');
  expect(addTask['1'][arrayElement.null].status).toBe(TaskStatuses.New);
  expect(addTask['1'].length).toBe(amountOfElements.three);
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

  const setTasks = tasksReducer(startState, {
    type: TASK_ACTIONS.SET,
    payload: { todoListId: '2', tasks: serverTasks },
  });

  expect(setTasks['1'][arrayElement.first].title).toBe('JS');
  expect(setTasks['1'][arrayElement.null].status).toBe(TaskStatuses.New);
  expect(setTasks['1'].length).toBe(amountOfElements.two);
});
