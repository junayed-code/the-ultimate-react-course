import styled from 'styled-components';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import { FormGroup, FormField, FormLabel, FormMessage } from '@ui/form';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

const Textarea = styled(Input).attrs({ as: 'textarea' })``;

type CabinFormProps<Values> = Omit<
  FormikConfig<Values>,
  'children' | 'component' | 'innerRef' | 'render'
> & { className?: string };

function CabinForm<V extends FormikValues>(props: CabinFormProps<V>) {
  const { className, ...formik } = props;

  return (
    <Formik {...formik}>
      {({ isSubmitting }) => (
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

          <Row $direction="horizontal" $justify="end" $gap="1rem">
            <Button $variant="secondary" type="reset">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Create Cabin
            </Button>
          </Row>
        </StyledForm>
      )}
    </Formik>
  );
}

export default CabinForm;
