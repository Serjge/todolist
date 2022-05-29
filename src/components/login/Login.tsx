import { ReactElement } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LoginDescription } from 'components';
import { selectIsLoginIn } from 'store/selectors';
import { loginTC } from 'store/thunks';
import { validateErrors } from 'utils';

export const Login = (): ReactElement => {
  const dispatch = useDispatch();

  const isLogin = useSelector(selectIsLoginIn);

  const { errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => validateErrors(values),

    onSubmit: (values, formikHelpers) => {
      dispatch(loginTC(values));
      formikHelpers.resetForm();
    },
  });

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <LoginDescription />

            <FormGroup>
              <TextField label="Email" margin="normal" {...getFieldProps('email')} />
              {touched.email && errors.email && <div>{errors.email}</div>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...getFieldProps('password')}
              />
              {touched.password && errors.password && <div>{errors.password}</div>}
              <FormControlLabel
                label="Remember me"
                control={<Checkbox />}
                {...getFieldProps('rememberMe')}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
