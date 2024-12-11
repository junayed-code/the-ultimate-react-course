import { string, number, object, ref, mixed, ValidationError } from 'yup';

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

export const UpdateUserSchema = object().shape({
  email: string().email(),
  avatar: mixed()
    .test('file-type-validation', value => {
      if (!(value instanceof File)) return true;
      const type = value.type.split('/').pop()!;
      const isValidType = ['png', 'jpg', 'jpeg'].includes(type);
      const message = `${type.toUpperCase()} file type is not supported`;
      return isValidType || new ValidationError(message, value, 'avatar');
    })
    .test(
      'file-size-validation',
      'File size must be less that 300KB',
      value => {
        if (!(value instanceof File)) return true;
        return value.size < 307200;
      },
    ),
  displayName: string()
    .required('Fill out this field with your name')
    .min(3, 'Fullname must be at least 3 characters')
    .max(32, 'Fullname must be at most 32 characters'),
});

export const UpdatePasswordFormSchema = object().shape({
  password: PasswordSchema,
  confirmPassword: string()
    .oneOf([ref('password')], 'Must match with password field value above')
    .required('Confirm password is a required field'),
});
