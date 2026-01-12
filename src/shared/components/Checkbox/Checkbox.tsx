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
  gap: 4px;
  flex-direction: column;
`;

const CheckboxContainer = styled.div`
  position: relative;

  display: flex;
  gap: 8px;
  align-items: center;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  width: 0;
  height: 0;

  opacity: 0;
  pointer-events: none;
`;

const CheckIcon = styled.svg`
  fill: none;
  opacity: 0;
  stroke: white;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div<{ hasError: boolean; disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.border.strong};
  border-radius: 4px;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background.surface};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

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
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  font-size: ${({ theme }) => theme.typography.size.md};

  cursor: pointer;
  user-select: none;

  ${HiddenCheckbox}:disabled ~ & {
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  margin-left: 28px;

  color: ${({ theme }) => theme.colors.state.danger};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;
