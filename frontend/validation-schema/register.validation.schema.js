import countries from '@/constants/countries';
import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  email: Yup.string().email().required().trim().lowercase().max(55),
  username: Yup.string().required().trim().lowercase().max(10),
  firstName: Yup.string().required().trim().max(30),
  lastName: Yup.string().required().trim().max(30),
  password: Yup.string().required().trim(),
  gender: Yup.string().trim().oneOf(['male', 'female', 'other']),
  countryOfOrigin: Yup.string().oneOf(countries, 'Invalid country name.'),
  currentRole: Yup.string()
    .trim()
    .oneOf(['explorer', 'editor'])
    .default('explorer'),
});
