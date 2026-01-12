import styled from '@emotion/styled';
import type { ComponentProps } from 'react';

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: string;
  error?: string;
}

const Checkbox = ({ label, error, id, ...props }: CheckboxProps) => {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <CheckboxWrapper>
      <CheckboxContainer>
        <HiddenCheckbox id={checkboxId} type="checkbox" {...props} />
        <StyledCheckbox hasError={!!error} disabled={props.disabled}>
          <CheckIcon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </CheckIcon>
        </StyledCheckbox>
        {label && <Label htmlFor={checkboxId}>{label}</Label>}
      </CheckboxContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </CheckboxWrapper>
  );
};

export default Checkbox;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
`;

const StyledCheckbox = styled.div<{ hasError: boolean; disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.border.strong};
  background-color: ${({ theme }) => theme.colors.background.surface};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  ${HiddenCheckbox}:checked + & {
    background-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primary};
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primary};

    ${CheckIcon} {
      opacity: 1;
    }
  }

  ${HiddenCheckbox}:focus-visible + & {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primary};
  }

  ${HiddenCheckbox}:not(:disabled) + &:hover {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primaryStrong};
  }

  ${({ theme, disabled }) =>
    disabled &&
    `
    background-color: ${theme.colors.background.disabled};
    border-color: ${theme.colors.border.subtle};

    ${HiddenCheckbox}:checked + & {
      background-color: ${theme.colors.border.strong};
      border-color: ${theme.colors.border.strong};
    }
  `}
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  user-select: none;

  ${HiddenCheckbox}:disabled ~ & {
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.state.danger};
  margin-left: 28px;
`;
