import { appReducer, setAppStatus, setAppError } from 'store/reducers';
import { AppType } from 'types';

let startState: AppType;

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  };
});

test('change status app', () => {
  const changeStatusApp = appReducer(startState, setAppStatus({ status: 'loading' }));

  expect(changeStatusApp.status).toBe('loading');
  expect(changeStatusApp.error).toBe(null);
});

test('change error app', () => {
  const isDoneTask = appReducer(startState, setAppError({ error: 'Error' }));

  expect(isDoneTask.status).toBe('idle');
  expect(isDoneTask.error).toBe('Error');
});
