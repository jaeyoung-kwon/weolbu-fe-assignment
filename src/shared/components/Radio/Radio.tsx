import styled from '@emotion/styled';
import type { ComponentProps } from 'react';

interface RadioProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: string;
  error?: string;
}

const Radio = ({ label, error, id, ...props }: RadioProps) => {
  const radioId =
    id || `${props.name}-${props.value}`.toLowerCase().replace(/\s+/g, '-');

  return (
    <RadioWrapper>
      <RadioContainer>
        <HiddenRadio id={radioId} type="radio" {...props} />
        <StyledRadio
          htmlFor={radioId}
          hasError={!!error}
          disabled={props.disabled}
        >
          <RadioDot />
        </StyledRadio>
        {label && <Label htmlFor={radioId}>{label}</Label>}
      </RadioContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </RadioWrapper>
  );
};

export default Radio;

const RadioWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const RadioContainer = styled.div`
  position: relative;

  display: flex;
  gap: 8px;
  align-items: center;
`;

const HiddenRadio = styled.input`
  position: absolute;
  width: 0;
  height: 0;

  opacity: 0;
  pointer-events: none;
`;

const RadioDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background-color: white;

  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;

const StyledRadio = styled.label<{ hasError: boolean; disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.border.strong};
  border-radius: 50%;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background.surface};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  ${HiddenRadio}:checked + & {
    background-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primary};
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primary};

    ${RadioDot} {
      opacity: 1;
    }
  }

  ${HiddenRadio}:focus-visible + & {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primary};
  }

  ${HiddenRadio}:not(:disabled) + &:hover {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.state.danger : theme.colors.brand.primaryStrong};
  }

  ${({ theme, disabled }) =>
    disabled &&
    `
    background-color: ${theme.colors.background.disabled};
    border-color: ${theme.colors.border.subtle};

    ${HiddenRadio}:checked + & {
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

  ${HiddenRadio}:disabled ~ & {
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  margin-left: 28px;

  color: ${({ theme }) => theme.colors.state.danger};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;
