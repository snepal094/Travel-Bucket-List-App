'use client';
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import { useParams } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import $axios from '../../../../../lib/axios/axios.instance';
import Loader from '../../../../../components/Loader';
import { useRouter } from 'next/navigation';
import { addDestinationValidationSchema } from '@/validation-schema/add.destination.validation.schema';

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();

  const destinationId = params.id;

  // get destination details
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['get-destination-details'],
    queryFn: async () => {
      return await $axios.get(`/destination/details/${destinationId}`);
    },
  });

  // edit destination
  const { isPending: editPending, mutate } = useMutation({
    mutationKey: ['edit-destination'],
    mutationFn: async (values) => {
      const response = await $axios.put(
        `/destination/edit/${destinationId}`,
        values
      );
      console.log(response.data);
    },
    onSuccess: () => {
      router.push(`/destination/details/${destinationId}`);
    },
  });

  const destinationDetails = data?.data?.destinationDetails;

  if (isPending || editPending) {
    return <Loader />;
  }

  if (isError) {
    return <div>Could not fetch data...</div>;
  }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: destinationDetails?.name || '',
          city: destinationDetails?.city || '',
          country: destinationDetails?.country || '',
          images: destinationDetails?.images || [],
          description: destinationDetails?.description || '',
        }}
        validationSchema={addDestinationValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="auth-form  min-w-[450px]"
            >
              <Typography variant="h4">Edit Destination</Typography>

              <FormControl fullWidth>
                <TextField label="Name" {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField label="City" {...formik.getFieldProps('city')} />
                {formik.touched.city && formik.errors.city ? (
                  <FormHelperText error>{formik.errors.city}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Country"
                  {...formik.getFieldProps('country')}
                  type="number"
                />
                {formik.touched.country && formik.errors.country ? (
                  <FormHelperText error>{formik.errors.country}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Images"
                  {...formik.getFieldProps('images')}
                  type="number"
                />

                {formik.touched.images && formik.errors.images ? (
                  <FormHelperText error>{formik.errors.images}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  {...formik.getFieldProps('description')}
                  multiline
                  rows={6}
                  label="Description"
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                // disabled={isPending}
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProductPage;
