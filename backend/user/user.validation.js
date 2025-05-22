import countries from '../constants/countries.js';
import Yup from 'Yup';

export const userValidationSchema = Yup.object({
  email: Yup.string().email().required().trim().lowercase().max(55),
  //.email() => checks for @ and .
  //no built in unique() validator in Yup, must do it manually
  username: Yup.string().required().trim().lowercase().max(10),
  firstName: Yup.string().required().trim().max(30),
  lastName: Yup.string().required().trim().max(30),
  password: Yup.string().required().trim(),
  gender: Yup.string().trim().oneOf(['male', 'female', 'other']),
  countryOfOrigin: Yup.string().oneOf(countries),
  currentRole: Yup.string()
    .trim()
    .oneOf(['explorer', 'editor'])
    .default('explorer'),
});

export const loginUserValidationSchema = Yup.object({
  identifier: Yup.string().required().trim().lowercase(),
  password: Yup.string().required().trim(),
});

export const roleSwitchSchema = Yup.object({
  currentRole: Yup.string().trim().oneOf(['explorer', 'editor']).required(),
});
