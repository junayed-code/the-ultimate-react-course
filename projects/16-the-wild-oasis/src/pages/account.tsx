import styled from 'styled-components';

import Container from '@ui/container';
import UpdateUserDataForm from '@features/auth/update-user-data-form';
import { useAuth } from '@hooks/auth';

const Section = styled.section`
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-200);

  h4 {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }

  &:first-of-type {
    margin-top: 2rem;
  }
`;

function Account() {
  const { user } = useAuth();

  return (
    <Container>
      <h3>{user?.user_metadata.displayName}&apos;s Account</h3>

      <Section>
        <h4>Your profile data</h4>
        <UpdateUserDataForm />
      </Section>
    </Container>
  );
}

export default Account;
