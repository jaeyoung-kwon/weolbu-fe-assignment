import styled from '@emotion/styled';
import type { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = ({ label, error, helperText, id, ...props }: InputProps) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <InputWrapper>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput id={inputId} hasError={!!error} {...props} />
      {(error || helperText) && (
        <HelperText hasError={!!error}>{error || helperText}</HelperText>
      )}
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  gap: 6px;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  padding: 12px 16px;
  outline: none;
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.border.subtle};
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.size.md};

  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};

    border-color: ${({ theme }) => theme.colors.border.subtle};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.border.strong};
  }
`;

const HelperText = styled.span<{ hasError: boolean }>`
  color: ${({ theme, hasError }) =>
    hasError ? theme.colors.state.danger : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;
