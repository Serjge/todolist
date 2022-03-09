import { amountOfElements, arrayElement, TaskPriorities } from 'enum';
import {
  addTodoList,
  changeFilterTodolist,
  changeTodolistEntityStatus,
  removeTodolist,
  renameTodoList,
  setTodoList,
  todoListsReducer,
} from 'store/reducers';
import { TodoListsServerType, TodoListsType } from 'types';

let startState: TodoListsType[];

beforeEach(() => {
  startState = [
    {
      id: '1',
      title: 'What to learn',
      addedDate: '',
      order: 0,
      filter: 'all',
      priority: TaskPriorities.Low,
      entityStatus: 'idle',
    },
    {
      id: '2',
      title: 'What to buy',
      addedDate: '',
      order: -1,
      filter: 'all',
      priority: TaskPriorities.Low,
      entityStatus: 'idle',
    },
  ];
});

test('remove todolist', () => {
  const deleteTodolist = todoListsReducer(
    startState,
    removeTodolist({ todolistId: '1' }),
  );

  expect(deleteTodolist[arrayElement.null].id).toBe('2');
  expect(deleteTodolist.length).toBe(amountOfElements.one);
});

test('change filter todolist', () => {
  const filterTodolist = todoListsReducer(
    startState,
    changeFilterTodolist({ todolistId: '1', filter: 'active' }),
  );

  expect(filterTodolist[arrayElement.null].filter).toBe('active');
  expect(filterTodolist[arrayElement.first].filter).toBe('all');
});

test('update title todolist', () => {
  const updateTodolist = todoListsReducer(
    startState,
    renameTodoList({ todolistId: '1', title: 'Test' }),
  );

  expect(updateTodolist[arrayElement.null].title).toBe('Test');
  expect(updateTodolist[arrayElement.first].title).toBe('What to buy');
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

  const addedTodolist = todoListsReducer(
    startState,
    addTodoList({ todoList: newTodolist }),
  );

  expect(addedTodolist[arrayElement.null].title).toBe('New');
  expect(addedTodolist[arrayElement.null].filter).toBe('all');
  expect(addedTodolist.length).toBe(amountOfElements.three);
});

test('set todolist', () => {
  const TodoLists: TodoListsServerType[] = [
    {
      id: '1',
      title: 'What to learn',
      addedDate: '',
      order: 0,
    },
    {
      id: '2',
      title: 'What to buy',
      addedDate: '',
      order: -1,
    },
  ];

  const setTodolist = todoListsReducer(
    startState,
    setTodoList({ todolistData: TodoLists }),
  );

  expect(setTodolist[arrayElement.null].title).toBe('What to learn');
  expect(setTodolist[arrayElement.null].filter).toBe('all');
  expect(setTodolist.length).toBe(amountOfElements.two);
});

test('change entity status todolist', () => {
  const updateTask = todoListsReducer(
    startState,
    changeTodolistEntityStatus({ todolistId: '1', entityStatus: 'loading' }),
  );

  expect(updateTask[arrayElement.null].entityStatus).toBe('loading');
  expect(updateTask[arrayElement.first].entityStatus).toBe('idle');
  expect(updateTask[arrayElement.first].title).toBe('What to buy');
});
