import { string, number, object, ref } from 'yup';

export const CreateCabinSchema = object().shape({
  name: string().required('Cabin name is a required field'),
  image: string().required('Cabin photo is a required field'),
  description: string()
    .min(15)
    .max(150)
    .required('Description is a required field'),
  capacity: number()
    .min(1)
    .max(10)
    .required('Maximum capacity is a required field'),
  price: number().min(1).required('Price is a required field'),
  discount: number()
    .min(0)
    .transform((value, original) => (original === '' ? 0 : value))
    .lessThan(ref('price'), 'Discount must be less than the regular price'),
});

export const UpdateCabinSchema = CreateCabinSchema.shape({});
