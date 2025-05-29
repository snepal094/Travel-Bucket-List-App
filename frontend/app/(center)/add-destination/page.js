'use client';

import $axios from '@/lib/axios/axios.instance';
import { addDestinationValidationSchema } from '@/validation-schema/add.destination.validation.schema';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AddDestination = () => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setAccessToken(token);
  }, []);

  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ['add-destination'],
    mutationFn: async (values) => {
      //axios.post(URL, req.body, headers)
      return await $axios.post('/destination/add', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });
  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          city: '',
          country: '',
          images: [],
          description: '',
        }}
        validationSchema={addDestinationValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
        // onSubmit={async (values) => {
        //   console.log(values);
        //   try {
        //     const token = localStorage.getItem('token'); // Retrieve token
        //     if (!token) {
        //       console.error('Token not found');
        //       return;
        //     }

        //     const response = await $axios.post('/destination/add', values, {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     });
        //     router.push('/');
        //   } catch (error) {
        //     console.log('error occurred');
        //   }
        // }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center shadow-2xl px-8 py-6 gap-3 max-w-[400px] min-h-[400px]"
            >
              <p className="text-3xl font-bold">Add Destination</p>
              <FormControl>
                <TextField
                  label="Name of the destination"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField label="City" {...formik.getFieldProps('city')} />
                {formik.touched.city && formik.errors.city ? (
                  <FormHelperText error>{formik.errors.city}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  label="Country"
                  {...formik.getFieldProps('country')}
                />
                {formik.touched.country && formik.errors.country ? (
                  <FormHelperText error>{formik.errors.country}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField label="Images" {...formik.getFieldProps('images')} />
                {formik.touched.images && formik.errors.images ? (
                  <FormHelperText error>{formik.errors.images}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  label="Description"
                  {...formik.getFieldProps('description')}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained" color="secondary">
                Add Destination
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddDestination;
