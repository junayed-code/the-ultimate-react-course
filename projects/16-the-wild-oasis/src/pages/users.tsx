import styled from 'styled-components';

import Container from '@ui/container';
import SignUpForm from '@features/auth/signup-form';

const Heading = styled.h3`
  margin-bottom: 2rem;
`;

function Users() {
  return (
    <Container>
      <Heading>Create a new user</Heading>
      <SignUpForm />
    </Container>
  );
}

export default Users;
