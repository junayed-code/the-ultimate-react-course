import styled from 'styled-components';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';

import Input from '@ui/input';
import { FormGroup, FormField, FormLabel, FormMessage } from '@ui/form';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

const Textarea = styled(Input).attrs({ as: 'textarea' })``;

type CabinFormProps<Values> = Omit<
  FormikConfig<Values>,
  'component' | 'innerRef' | 'render'
> & { className?: string };

function CabinForm<V extends FormikValues>(props: CabinFormProps<V>) {
  const { className, children, ...formik } = props;

  return (
    <Formik {...formik}>
      {formikProps => (
        <StyledForm className={className}>
          <FormGroup name="name">
            <FormLabel>Cabin name</FormLabel>
            <FormField type="text" as={Input} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="capacity">
            <FormLabel>Maximum capacity</FormLabel>
            <FormField type="number" as={Input} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="price">
            <FormLabel>Regular price</FormLabel>
            <FormField type="number" as={Input} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="discount">
            <FormLabel>Discount price</FormLabel>
            <FormField type="number" as={Input} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="description">
            <FormLabel>Description</FormLabel>
            <FormField as={Textarea} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="image">
            <FormLabel>Cabin photo</FormLabel>
            <FormField type="file" accept="image/*" as={Input} />
            <FormMessage />
          </FormGroup>

          {typeof children === 'function' ? children(formikProps) : children}
        </StyledForm>
      )}
    </Formik>
  );
}

export default CabinForm;
