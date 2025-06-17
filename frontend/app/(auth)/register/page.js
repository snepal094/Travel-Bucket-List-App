'use client';

// because Formik only works in the browser
// since it depends on window and handling form input events

import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  SnackbarContent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { registerValidationSchema } from '@/validation-schema/register.validation.schema';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import $axios from '@/lib/axios/axios.instance';
import genders from '@/constants/genders';
import countries from '@/constants/countries';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {
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
    mutationKey: ['register-user'], //unique name
    mutationFn: async (values) => {
      return await $axios.post('/user/register', values);
    },
    onSuccess: (response) => {
      // console.log(response);
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    },
    onError: (error) => {
      setSnackbarMessage(error.response.data.message);
      setSnackbarOpen(true);
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
                className="flex flex-col justify-between min-w-[400px] max-w-[600px] items-center shadow-2xl shadow-gray-500 px-8 py-4 min-h-[400px] gap-3"
              >
                <p className="text-3xl font-bold">Create a new account</p>

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

                {/* First Name and Last Name on the same line */}
                <div className="flex w-full gap-3">
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
                </div>

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

                <FormControl fullWidth>
                  <span className="text-gray-500">Gender</span>
                  <div className="flex justify-between gap-3">
                    <TextField
                      value="Male"
                      InputProps={{
                        startAdornment: (
                          <Radio
                            value="male"
                            checked={formik.values.gender === 'male'}
                            onChange={() =>
                              formik.setFieldValue('gender', 'male')
                            }
                          />
                        ),
                        readOnly: true,
                      }}
                      onClick={() => formik.setFieldValue('gender', 'male')}
                    />
                    <TextField
                      value="Female"
                      InputProps={{
                        startAdornment: (
                          <Radio
                            value="female"
                            checked={formik.values.gender === 'female'}
                            onChange={() =>
                              formik.setFieldValue('gender', 'female')
                            }
                          />
                        ),
                        readOnly: true,
                      }}
                      onClick={() => formik.setFieldValue('gender', 'female')}
                    />
                    <TextField
                      value="Other"
                      InputProps={{
                        startAdornment: (
                          <Radio
                            value="other"
                            checked={formik.values.gender === 'other'}
                            onChange={() =>
                              formik.setFieldValue('gender', 'other')
                            }
                          />
                        ),
                        readOnly: true,
                      }}
                      onClick={() => formik.setFieldValue('gender', 'other')}
                    />
                  </div>
                  {formik.touched.currentRole && formik.errors.currentRole ? (
                    <FormHelperText error>
                      {formik.errors.currentRole}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    {...formik.getFieldProps('countryOfOrigin')}
                    label="Country"
                  >
                    {countries.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.touched.countryOfOrigin &&
                  formik.errors.countryOfOrigin ? (
                    <FormHelperText error>
                      {formik.errors.countryOfOrigin}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth>
                  <span className="text-gray-500">Current Role</span>
                  <div className="flex w-full gap-3">
                    <TextField
                      value="Explorer"
                      InputProps={{
                        startAdornment: (
                          <Radio
                            value="explorer"
                            checked={formik.values.currentRole === 'explorer'}
                            onChange={() =>
                              formik.setFieldValue('currentRole', 'explorer')
                            }
                          />
                        ),
                        readOnly: true,
                      }}
                      onClick={() =>
                        formik.setFieldValue('currentRole', 'explorer')
                      }
                    />
                    <TextField
                      value="Editor"
                      InputProps={{
                        startAdornment: (
                          <Radio
                            value="editor"
                            checked={formik.values.currentRole === 'editor'}
                            onChange={() =>
                              formik.setFieldValue('currentRole', 'editor')
                            }
                          />
                        ),
                        readOnly: true,
                      }}
                      onClick={() =>
                        formik.setFieldValue('currentRole', 'editor')
                      }
                    />
                  </div>
                  {formik.touched.currentRole && formik.errors.currentRole ? (
                    <FormHelperText error>
                      {formik.errors.currentRole}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  fullWidth
                  type="submit"
                  sx={{ backgroundColor: '#7B8D6A', color: '#fff' }}
                  variant="contained"
                  disabled={isPending} //can't click on the button when loading
                >
                  Register
                </Button>
                <span>
                  Have an account?{' '}
                  <Link href={'/login'} className="text-blue-700 font-bold">
                    Log in
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

export default Register;
