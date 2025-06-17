'use client';

import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@mui/material';
import { loginValidationSchema } from '@/validation-schema/login.validation.schema';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import $axios from '@/lib/axios/axios.instance';
import { useMutation } from '@tanstack/react-query';
import Slideshow from '@/components/SlideShow';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const router = useRouter();

  //* password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  //* snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { isPending, error, mutate } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: async (values) => {
      return await $axios.post('/user/login', values);
    },
    onSuccess: (response) => {
      // response.data has API response
      // console.log(response);
      window.localStorage.setItem('token', response?.data?.accessToken);
      window.localStorage.setItem(
        'firstName',
        response?.data?.userDetails?.firstName
      );
      window.localStorage.setItem(
        'currentRole',
        response?.data?.userDetails?.currentRole
      );

      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    },
    onError: (error) => {
      //error.message = generic error string (from JS/axios/browser)
      //error.response.data.message = custom message sent by your backend API (if available)
      // console.log(error);
      console.log(error.response.data.message);
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '8rem',
      }}
    >
      {isPending && <LinearProgress color="secondary" />}
      <Slideshow />
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
            <div>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-extrabold text-[#7B8D6A] mb-2">
                  BucketMap
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Explore. Mark. Remember.
                </p>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-between min-w-[400px] items-center shadow-2xl shadow-gray-500 px-8 pt-4 pb-6 min-h-[600px]"
              >
                <p className="text-4xl font-bold mt-4">Log In</p>

                <div className="flex flex-col gap-8 w-full">
                  <FormControl fullWidth>
                    {/* FormControl is a div */}
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

                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>

                    <OutlinedInput
                      {...formik.getFieldProps('password')}
                      // type={showPassword ? 'text' : 'password'}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? 'hide the password'
                                : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />

                    {formik.touched.password && formik.errors.password ? (
                      <FormHelperText error>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </div>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  // color="secondary"
                  sx={{ backgroundColor: '#7B8D6A', color: '#fff' }}
                  disabled={isPending}
                >
                  Log In
                </Button>
                {/*className doesn't work in Button*/}
                <span>
                  Don't have an account?{' '}
                  <Link href={'/register'} className="text-blue-700 font-bold">
                    Sign up
                  </Link>
                </span>
              </form>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
              />
            </div>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
