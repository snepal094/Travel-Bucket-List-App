import Yup from 'Yup';

export const bucketValidationSchema = Yup.object({
  destinationId: Yup.string().required().trim(),
});
