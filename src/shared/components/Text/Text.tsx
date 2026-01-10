import styled from '@emotion/styled';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { AppTheme } from '../../../styles/theme';

type TextSize = keyof AppTheme['typography']['size'];
type TextWeight = keyof AppTheme['typography']['weight'];
type LineHeight = keyof AppTheme['typography']['lineHeight'];
type TextColor = keyof AppTheme['colors']['text'];

interface TextBaseProps {
  size?: TextSize;
  weight?: TextWeight;
  lineHeight?: LineHeight;
  color?: TextColor;
}

type TextProps<T extends ElementType = 'span'> = TextBaseProps &
  ComponentPropsWithoutRef<T> & {
    as?: T;
  };

const Text = <T extends ElementType = 'span'>({
  as,
  size = 'md',
  weight = 'regular',
  lineHeight = 'normal',
  color = 'primary',
  children,
  ...props
}: TextProps<T>) => {
  return (
    <StyledText
      as={as}
      size={size}
      weight={weight}
      lineHeight={lineHeight}
      color={color}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled.span<TextBaseProps>`
  font-size: ${({ theme, size }) => theme.typography.size[size || 'md']};
  font-weight: ${({ theme, weight }) =>
    theme.typography.weight[weight || 'regular']};
  line-height: ${({ theme, lineHeight }) =>
    theme.typography.lineHeight[lineHeight || 'normal']};
  color: ${({ theme, color }) => theme.colors.text[color || 'primary']};
  margin: 0;
`;
