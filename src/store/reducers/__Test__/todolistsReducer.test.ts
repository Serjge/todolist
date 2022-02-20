import { amountOfElements, arrayElement, TaskPriorities } from 'enum';
import { TODOLIST_ACTIONS } from 'store/actions';
import { todoListsReducer } from 'store/reducers';
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
  const removeTodolist = todoListsReducer(startState, {
    type: TODOLIST_ACTIONS.REMOVE,
    payload: { todolistId: '1' },
  });

  expect(removeTodolist[arrayElement.null].id).toBe('2');
  expect(removeTodolist.length).toBe(amountOfElements.one);
});

test('change filter todolist', () => {
  const filterTodolist = todoListsReducer(startState, {
    type: TODOLIST_ACTIONS.CHANGE_FILTER,
    payload: { todolistId: '1', filter: 'active' },
  });

  expect(filterTodolist[arrayElement.null].filter).toBe('active');
  expect(filterTodolist[arrayElement.first].filter).toBe('all');
});

test('update title todolist', () => {
  const updateTodolist = todoListsReducer(startState, {
    type: TODOLIST_ACTIONS.RENAME,
    payload: { todolistId: '1', title: 'Test' },
  });

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

  const addTodolist = todoListsReducer(startState, {
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

  const setTodolist = todoListsReducer(startState, {
    type: TODOLIST_ACTIONS.SET,
    payload: { todolistData: TodoLists },
  });

  expect(setTodolist[arrayElement.null].title).toBe('What to learn');
  expect(setTodolist[arrayElement.null].filter).toBe('all');
  expect(setTodolist.length).toBe(amountOfElements.two);
});

test('change entity status todolist', () => {
  const updateTask = todoListsReducer(startState, {
    type: TODOLIST_ACTIONS.CHANGE_ENTITY_STATUS,
    payload: { todolistId: '1', entityStatus: 'loading' },
  });

  expect(updateTask[arrayElement.null].entityStatus).toBe('loading');
  expect(updateTask[arrayElement.first].entityStatus).toBe('idle');
  expect(updateTask[arrayElement.first].title).toBe('What to buy');
});
