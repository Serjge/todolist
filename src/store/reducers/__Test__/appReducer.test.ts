import { AUTH_ACTIONS } from 'store/actions';
import { appReducer } from 'store/reducers';
import { AppType } from 'types';

let startState: AppType;

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
  };
});

test('change status app', () => {
  const changeStatusApp = appReducer(startState, {
    type: AUTH_ACTIONS.SET_STATUS,
    payload: { status: 'loading' },
  });

  expect(changeStatusApp.status).toBe('loading');
  expect(changeStatusApp.error).toBe(null);
});

test('change error app', () => {
  const isDoneTask = appReducer(startState, {
    type: AUTH_ACTIONS.SET_ERROR,
    payload: { error: 'Error' },
  });

  expect(isDoneTask.status).toBe('idle');
  expect(isDoneTask.error).toBe('Error');
});
