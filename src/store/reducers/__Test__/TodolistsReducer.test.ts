import { amountOfElements, arrayElement, TaskPriorities } from 'enum';
import { TODOLIST_ACTIONS } from 'store/actions';
import { TodoListsReducer } from 'store/reducers';
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
    },
    {
      id: '2',
      title: 'What to buy',
      addedDate: '',
      order: -1,
      filter: 'all',
      priority: TaskPriorities.Low,
    },
  ];
});

test('remove todolist', () => {
  const removeTodolist = TodoListsReducer(startState, {
    type: TODOLIST_ACTIONS.REMOVE,
    payload: { todolistId: '1' },
  });

  expect(removeTodolist[arrayElement.null].id).toBe('2');
  expect(removeTodolist.length).toBe(amountOfElements.one);
});

test('change filter todolist', () => {
  const filterTodolist = TodoListsReducer(startState, {
    type: TODOLIST_ACTIONS.CHANGE_FILTER,
    payload: { todolistId: '1', filter: 'active' },
  });

  expect(filterTodolist[arrayElement.null].filter).toBe('active');
  expect(filterTodolist[arrayElement.first].filter).toBe('all');
});

test('update title todolist', () => {
  const updateTask = TodoListsReducer(startState, {
    type: TODOLIST_ACTIONS.RENAME,
    payload: { todolistId: '1', title: 'Test' },
  });

  expect(updateTask[arrayElement.null].title).toBe('Test');
  expect(updateTask[arrayElement.first].title).toBe('What to buy');
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

  const addTodolist = TodoListsReducer(startState, {
    type: TODOLIST_ACTIONS.ADD,
    payload: { todoList: newTodolist },
  });

  expect(addTodolist[arrayElement.null].title).toBe('New');
  expect(addTodolist[arrayElement.null].filter).toBe('all');
  expect(addTodolist.length).toBe(amountOfElements.three);
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

  const setTodolist = TodoListsReducer(startState, {
    type: TODOLIST_ACTIONS.SET,
    payload: { todolistData: TodoLists },
  });

  expect(setTodolist[arrayElement.null].title).toBe('What to learn');
  expect(setTodolist[arrayElement.null].filter).toBe('all');
  expect(setTodolist.length).toBe(amountOfElements.two);
});
