import type { ComponentProps } from 'react';
import Button from '../Button/Button';
import styled from '@emotion/styled';

type ModalPrimaryButtonProps = ComponentProps<'button'>;

const ModalPrimaryButton = ({
  children,
  ...props
}: ModalPrimaryButtonProps) => {
  return (
    <StyledButton variant="filled" {...props}>
      {children}
    </StyledButton>
  );
};

export default ModalPrimaryButton;

const StyledButton = styled(Button)`
  flex: 1;
`;
