'use client';

import React from 'react';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { loginValidationSchema } from '@/validation-schema/login.validation.schema';

const Login = () => {
  return (
    <Box>
      <Formik
        initialValues={{
          identifier: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-between min-w-[400px] items-center shadow-2xl shadow-gray-500 px-8 py-4 min-h-[400px]"
            >
              <p className="text-3xl font-bold">Log In</p>

              <FormControl fullWidth>
                <TextField
                  label="Email or Username"
                  {...formik.getFieldProps('identifier')}
                />
                {formik.touched.identifier && formik.errors.identifier ? (
                  <FormHelperText error>
                    {formik.errors.identifier}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              {/* FormControl is a div */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
              >
                Log In
              </Button>
              {/*className doesn't work in Button*/}
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
