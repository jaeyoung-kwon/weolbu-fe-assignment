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
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.typography.size.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.border.subtle};
  border-radius: 8px;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.border.strong};
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
`;

const HelperText = styled.span<{ hasError: boolean }>`
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme, hasError }) =>
    hasError ? theme.colors.state.danger : theme.colors.text.secondary};
`;
