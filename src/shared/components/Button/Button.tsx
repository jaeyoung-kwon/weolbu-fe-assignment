import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ComponentProps } from 'react';

type ButtonVariant = 'filled' | 'outlined' | 'transparent';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}

const Button = ({ variant = 'filled', children, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ variant: ButtonVariant }>`
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 8px;

  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  font-size: ${({ theme }) => theme.typography.size.md};

  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out,
    color 0.2s ease-in-out;

  ${({ theme, variant }) => {
    if (variant === 'filled') {
      return css`
        background-color: ${theme.colors.brand.primary};
        color: ${theme.colors.text.inverse};

        border-color: ${theme.colors.brand.primary};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.brand.primaryStrong};
          border-color: ${theme.colors.brand.primaryStrong};
        }

        &:active:not(:disabled) {
          box-shadow: inset 0 2px 6px rgb(0 0 0 / 15%);
          background-color: ${theme.colors.brand.primaryStrong};
        }
      `;
    }

    if (variant === 'transparent') {
      return css`
        padding: 8px 12px;

        background-color: transparent;
        color: ${theme.colors.brand.primary};

        border-color: transparent;

        &:hover:not(:disabled) {
          text-decoration: underline;
        }

        &:active:not(:disabled) {
          color: ${theme.colors.brand.primaryStrong};
        }
      `;
    }

    return css`
      background-color: transparent;
      color: ${theme.colors.brand.primary};

      border-color: ${theme.colors.brand.primary};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.brand.primaryMuted};
      }

      &:active:not(:disabled) {
        background-color: ${theme.colors.brand.primaryMuted};
        border-color: ${theme.colors.brand.primaryStrong};
      }
    `;
  }}

  &:disabled {
    box-shadow: none;

    background-color: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};

    border-color: ${({ theme }) => theme.colors.border.subtle};
    cursor: not-allowed;
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }
`;
