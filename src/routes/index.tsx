import styled from '@emotion/styled';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <Page>
      <div>홈 페이지</div>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background:
    radial-gradient(circle at top, rgba(255, 157, 46, 0.18), transparent 55%),
    radial-gradient(
      circle at 15% 20%,
      rgba(75, 107, 251, 0.22),
      transparent 45%
    ),
    ${({ theme }) => theme.colors.background.canvas};
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      rgba(75, 107, 251, 0.18),
      rgba(31, 59, 212, 0)
    );
    filter: blur(0px);
    z-index: 0;
  }

  &::before {
    width: 320px;
    height: 320px;
    top: -140px;
    right: -120px;
  }

  &::after {
    width: 260px;
    height: 260px;
    bottom: -130px;
    left: -110px;
    background: linear-gradient(
      135deg,
      rgba(255, 157, 46, 0.25),
      rgba(231, 120, 0, 0)
    );
  }
`;
