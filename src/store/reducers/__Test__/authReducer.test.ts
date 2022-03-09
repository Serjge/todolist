import { authReducer, setIsLoggedIn } from 'store/reducers';
import { AuthInitialType } from 'types';

let startState: AuthInitialType;

beforeEach(() => {
  startState = {
    isLoginIn: false,
  };
});

test('change isLoginIn ', () => {
  const changeIsLoginIn = authReducer(startState, setIsLoggedIn({ isLoginIn: true }));

  expect(changeIsLoginIn.isLoginIn).toBe(true);
});
