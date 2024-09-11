import styled from 'styled-components';

const Input = styled.input`
  max-width: 100%;
  font-size: 0.875rem;
  padding: 0.5rem 0.625rem;
  outline: none;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-300);

  /* Style file type input field */
  &[type='file'] {
    padding-block: 0;
    padding-left: 0;
    font-weight: 500;
    color: var(--color-grey-500);

    &::file-selector-button {
      border: none;
      cursor: pointer;
      color: var(--color-brand-50);
      background-color: var(--color-brand-500);
      margin-right: 1rem;
      padding: 0.75rem 1rem;
      border-start-start-radius: var(--border-radius-sm);
      border-end-start-radius: var(--border-radius-sm);
      transition: background-color 200ms;
      &:hover {
        background-color: var(--color-brand-600);
      }
    }
  }

  /* Style textarea input field */
  textarea& {
    height: 5rem;
  }
`;

export default Input;
