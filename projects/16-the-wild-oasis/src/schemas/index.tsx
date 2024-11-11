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

export const UpdateSettingsSchema = object().shape({
  breakfast_price: number().required('Breakfast price is required field'),
  min_bookings: number().required('Minimum nights/booking is a required field'),
  max_bookings: number().required('Maximum nights/booking is a required field'),
  guests_per_bookings: number().required(
    'Maximum guests/booking is required field',
  ),
});

export const LoginSchema = object().shape({
  email: string().email().required('Email is a required field'),
  password: string().min(6).max(25).required('Password is a required field'),
});

// Define a password validation schema
const PasswordSchema = string()
  .min(8, 'Password must be at least 8 characters')
  .max(25, 'Password must be at most 25 characters')
  .matches(/[0-9]/, 'Password must have at least a number')
  .matches(/[A-Z]/, 'Password must have at least an uppercase letter')
  .required('Password is a required field');

// User sing up form' validation schema
export const SignUpSchema = object().shape({
  name: string().required('Name is a required field'),
  email: string().email().required('Email is a required field'),
  password: PasswordSchema,
  confirmPassword: string()
    .min(8)
    .max(25)
    .oneOf([ref('password')], 'Must match with the password field value')
    .required('Confirm password is a required field'),
});
