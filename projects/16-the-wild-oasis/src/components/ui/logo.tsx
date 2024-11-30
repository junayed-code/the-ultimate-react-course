import styled from 'styled-components';
import { useTheme } from '@features/theme/context';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 5rem;
  width: auto;
`;

function Logo() {
  const { theme } = useTheme();

  return (
    <StyledLogo>
      <Img src={`/logo-${theme}.png`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
