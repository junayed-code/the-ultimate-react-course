import React from 'react';
import styled from 'styled-components';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldConfig,
  useFormikContext,
} from 'formik';

import Row from '@ui/row';

const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-grey-800);
`;

const StyledMessage = styled.span`
  font-size: 0.875rem;
  color: var(--color-red-700);
`;

type FormGroupContextValue = { id: string; name: string };

type FormGroupProps = React.ComponentPropsWithoutRef<typeof Row> & {
  name: string;
};

const FormGroupContext = React.createContext({} as FormGroupContextValue);

const useFormGroup = () => React.useContext(FormGroupContext);

const FormGroup = ({ name, ...props }: FormGroupProps) => {
  const id = React.useId();
  return (
    <FormGroupContext.Provider value={{ id: `${id}${name}`, name }}>
      <Row $direction="vertical" $align="stretch" $width="full" {...props} />
    </FormGroupContext.Provider>
  );
};

type FormFieldProps = Omit<FieldConfig, 'name' | 'type'> &
  React.InputHTMLAttributes<HTMLInputElement>;

const FormField = (props: FormFieldProps) => {
  const { id, name } = useFormGroup();
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const fieldProps: typeof props = { ...props, id, name };

  if (props.type === 'file') {
    fieldProps.value = undefined;
    fieldProps.onBlur = undefined;
    fieldProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldTouched(name, true);
      setFieldValue(name, e.target.files?.[0]);
    };
  }

  return <Field {...fieldProps} />;
};

const FormLabel = (
  props: Omit<React.ComponentPropsWithoutRef<typeof StyledLabel>, 'htmlFor'>,
) => {
  const { id } = useFormGroup();
  return <StyledLabel {...props} htmlFor={id} />;
};

const FormMessage = () => {
  const { name } = useFormGroup();
  return <ErrorMessage name={name} component={StyledMessage} />;
};

export { Formik, Form, FormGroup, FormField, FormLabel, FormMessage };
