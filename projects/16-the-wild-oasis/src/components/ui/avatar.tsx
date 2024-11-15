import React from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div<{ $size?: string }>`
  display: inline-block;
  width: ${({ $size }) => $size ?? '2rem'};
  height: ${({ $size }) => $size ?? '2rem'};
`;

const StyledAvatar = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

type AvatarProps = React.ComponentProps<typeof StyledAvatar> & {
  size?: string;
};

function Avatar({ src, size, ...props }: AvatarProps) {
  return (
    <AvatarContainer $size={size}>
      <StyledAvatar src={src || '/default-user.jpg'} {...props} />
    </AvatarContainer>
  );
}

export default Avatar;
