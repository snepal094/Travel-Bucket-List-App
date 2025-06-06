'use client';

// because Formik only works in the browser
// since it depends on window and handling form input events

import React from 'react';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
} from '@mui/material';
import { registerValidationSchema } from '@/validation-schema/register.validation.schema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import $axios from '@/lib/axios/axios.instance';

const Register = () => {
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationKey: ['register-user'], //unique name
    mutationFn: async (values) => {
      return await $axios.post('/user/register', values);
    },
    onSuccess: () => {
      router.push('/login');
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
          email: '',
          username: '',
          firstName: '',
          lastName: '',
          password: '',
          gender: '',
          countryOfOrigin: '',
          currentRole: '',
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}

        //? if not useMutation (beginner):
        // onSubmit={async (values) => {
        //   try {
        //     const response = await axios.post(
        //       'http://localhost:8888/user/register',
        //       values
        //     );
        //     router.push('/login');
        //   } catch (error) {
        //     console.log('error occurred.');
        //   }
        // }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-between min-w-[400px] items-center shadow-2xl shadow-gray-500 px-8 py-4 min-h-[400px] gap-3"
            >
              <p className="text-3xl font-bold">Register</p>

              <FormControl fullWidth>
                <TextField label="Email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Username"
                  {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username ? (
                  <FormHelperText error>
                    {formik.errors.username}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="First Name"
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormHelperText error>
                    {formik.errors.firstName}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Last Name"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormHelperText error>
                    {formik.errors.lastName}
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

              <FormControl fullWidth>
                <TextField label="Gender" {...formik.getFieldProps('gender')} />
                {formik.touched.gender && formik.errors.gender ? (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Country"
                  {...formik.getFieldProps('countryOfOrigin')}
                />
                {formik.touched.countryOfOrigin &&
                formik.errors.countryOfOrigin ? (
                  <FormHelperText error>
                    {formik.errors.countryOfOrigin}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Current Role"
                  {...formik.getFieldProps('currentRole')}
                />
                {formik.touched.currentRole && formik.errors.currentRole ? (
                  <FormHelperText error>
                    {formik.errors.currentRole}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                fullWidth
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isPending} //can't click on the button when loading
              >
                Register
              </Button>
              <Link href={'/login'} className="text-blue-700 underline">
                Already Registered? Login
              </Link>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Register;

//TODO password visibility, drop down menu
