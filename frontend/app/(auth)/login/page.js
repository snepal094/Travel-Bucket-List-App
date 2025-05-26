'use client';

import React, { use } from 'react';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
} from '@mui/material';
import { loginValidationSchema } from '@/validation-schema/login.validation.schema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import $axios from '@/lib/axios/axios.instance';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: async (values) => {
      return await $axios.post('/user/login', values);
    },
    onSuccess: (response) => {
      console.log(response);
      window.localStorage.setItem('token', response?.data?.accessToken);
      window.localStorage.setItem(
        'firstName',
        response?.data?.userDetails?.firstName
      );
      window.localStorage.setItem(
        'currentRole',
        response?.data?.userDetails?.currentRole
      );

      router.push('/');
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  return (
    <Box>
      {isPending && <LinearProgress color="secondary" />}
      <Formik
        initialValues={{
          identifier: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}

        //   onSubmit={async (values) => {
        //     console.log(values);
        //     try {
        //       const response = await $axios.post(
        //         '/user/login',
        //         //req.body:
        //         {
        //           identifier: values.identifier,
        //           password: values.password,
        //         }
        //       );

        //       window.localStorage.setItem('token', response?.data?.accessToken);
        //       window.localStorage.setItem(
        //         'firstName',
        //         response?.data?.userDetails?.firstName
        //       );
        //       window.localStorage.setItem(
        //         'currentRole',
        //         response?.data?.userDetails?.currentRole
        //       );

        //       router.push('/');

        //       console.log(response);
        //     } catch (error) {
        //       console.log('error occurred');
        //     }
        //   }}
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
                disabled={isPending}
              >
                Log In
              </Button>
              {/*className doesn't work in Button*/}

              <div>
                <Link href={'/register'} className="text-blue-700 underline">
                  New here? Register
                </Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
