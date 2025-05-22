import Yup from 'Yup';
import countries from '../constants/countries.js';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants/page.and.limit.js';

export const addDestinationValidationSchema = Yup.object({
  name: Yup.string().trim().required().max(50),
  city: Yup.string().trim().required().max(50),
  country: Yup.string().oneOf(countries).required(),
  description: Yup.string().required().trim().min(10).max(1000),
});

export const paginationDataValidationSchema = Yup.object({
  page: Yup.number().min(1).integer().default(DEFAULT_PAGE),
  limit: Yup.number().min(1).integer().default(DEFAULT_LIMIT),
  searchText: Yup.string().trim().notRequired(),
});
