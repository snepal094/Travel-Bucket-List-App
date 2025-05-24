import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  identifier: Yup.string('Email or Username must be a string.')
    .required('Required field.')
    .trim()
    .max(55, 'Character limit exceeded.')
    .lowercase(),
  password: Yup.string()
    .required('Required field.')
    .max(20, 'Character limit exceeded.'),
});
