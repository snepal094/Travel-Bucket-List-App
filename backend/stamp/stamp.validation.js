import Yup from 'Yup';

export const stampValidationSchema = Yup.object({
  visitedDate: Yup.date()
    .required('Visited date is required')
    .typeError('Visited date must be a valid date'),

  review: Yup.object({
    comment: Yup.string()
      .trim()
      .min(50, 'Comment must be at least 50 characters')
      .max(1000, 'Comment must be at most 1000 characters'),

    rating: Yup.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5'),

    images: Yup.array()
      .of(Yup.string().trim())
      .max(3, 'You can upload up to 3 images only'),
  }),
});
