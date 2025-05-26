import countries from '@/constants/countries';
import * as Yup from 'yup';

export const addDestinationValidationSchema = Yup.object({
  name: Yup.string().trim().required().max(50),
  city: Yup.string().trim().required().max(50),
  country: Yup.string().oneOf(countries).required(),
  description: Yup.string().required().trim().min(10).max(1000),
});
