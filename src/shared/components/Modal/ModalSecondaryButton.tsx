import type { ComponentProps } from 'react';
import Button from '../Button/Button';
import styled from '@emotion/styled';

type ModalSecondaryButtonProps = ComponentProps<'button'>;

const ModalSecondaryButton = ({
  children,
  ...props
}: ModalSecondaryButtonProps) => {
  return (
    <StyledButton variant="outlined" {...props}>
      {children}
    </StyledButton>
  );
};

export default ModalSecondaryButton;

const StyledButton = styled(Button)`
  flex: 1;
`;
