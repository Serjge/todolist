import { LoginParamsType } from 'types';

type errorType = Partial<Omit<LoginParamsType, 'captcha'>>;

export const validateErrors = (values: {
  email: string;
  password: string;
  rememberMe: boolean;
}): errorType => {
  const errors: errorType = {};
  const minSymbolPassword = 3;
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < minSymbolPassword) {
    errors.password = 'pass min 3 ';
  }
  return errors;
};
