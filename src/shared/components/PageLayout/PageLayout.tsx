import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

interface PageLayoutProps {
  hasFooter?: boolean;
}

const PageLayout = ({
  hasFooter,
  children,
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <Page>
      <Container hasFooter={hasFooter}>{children}</Container>
    </Page>
  );
};

export default PageLayout;

const Page = styled.div`
  overflow: hidden;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    radial-gradient(circle at top, rgb(255 157 46 / 18%), transparent 55%),
    radial-gradient(circle at 15% 20%, rgb(75 107 251 / 22%), transparent 45%),
    ${({ theme }) => theme.colors.background.canvas};
`;

const Container = styled.div<{ hasFooter?: boolean }>`
  width: 100%;
  min-height: 100vh;
  max-width: 480px;
  padding: ${({ hasFooter }) => (hasFooter ? '24px 16px 84px' : '24px 16px')};
  border-right: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-left: 1px solid ${({ theme }) => theme.colors.border.subtle};

  background-color: ${({ theme }) => theme.colors.background.surface};
`;
