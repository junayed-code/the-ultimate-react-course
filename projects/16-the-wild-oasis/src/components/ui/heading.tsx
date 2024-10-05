import styled from 'styled-components';

const fontSize = {
  h1: '3.25rem',
  h2: '2.75rem',
  h3: '2.25rem',
  h4: '1.5rem',
  h5: '1rem',
};

const Heading = styled.h1<{ $size?: string }>`
  font-size: ${({ $size, as: _as = 'h1' }) =>
    $size || fontSize[_as as keyof typeof fontSize]};
`;

export default Heading;
