import React from 'react';
import styled from 'styled-components';
import { Formik, Form, ErrorMessage, useField } from 'formik';

import Row from '@ui/row';

const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
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
      <Row $align="stretch" {...props} />
    </FormGroupContext.Provider>
  );
};

type FormFieldProps = { children: React.ReactElement };

const FormField = ({ children }: FormFieldProps) => {
  const { id, name } = useFormGroup();
  const [field, , helpers] = useField(name);

  if (children.props.type === 'file') {
    field.value = undefined;
    field.onBlur = () => void 0;
    field.onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      helpers.setTouched(true);
      helpers.setValue(e.target.files?.[0]);
    };
  }

  const props = { ...children.props, ...field, id };
  return React.cloneElement(children, props);
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
