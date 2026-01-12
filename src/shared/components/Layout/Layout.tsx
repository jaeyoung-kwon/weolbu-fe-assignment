import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Page>
      <Container>{children}</Container>
    </Page>
  );
};

export default Layout;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top, rgba(255, 157, 46, 0.18), transparent 55%),
    radial-gradient(
      circle at 15% 20%,
      rgba(75, 107, 251, 0.22),
      transparent 45%
    ),
    ${({ theme }) => theme.colors.background.canvas};
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-right: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: 24px 16px;
`;
