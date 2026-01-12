import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <FooterContainer>{children}</FooterContainer>;
};

export default Footer;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 10;
  width: 100%;
  max-width: 480px;
  padding: 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-left: 1px solid ${({ theme }) => theme.colors.border.subtle};
  box-shadow: 0 -2px 8px rgb(0 0 0 / 10%);

  background-color: ${({ theme }) => theme.colors.background.surface};

  transform: translateX(-50%);
`;
