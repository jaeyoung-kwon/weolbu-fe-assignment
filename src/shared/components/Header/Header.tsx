import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Text } from '../Text';

interface HeaderProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
}

const Header = ({ title, left, right }: HeaderProps) => {
  return (
    <HeaderContainer>
      {left && <LeftSection>{left}</LeftSection>}
      <Text as="h1" size="xl" weight="bold">
        {title}
      </Text>
      {right && <RightSection>{right}</RightSection>}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: relative;
  height: 36px;
  margin-bottom: 24px;

  text-align: center;
`;

const LeftSection = styled.div`
  position: absolute;
  top: 50%;
  left: 0;

  transform: translateY(-50%);
`;

const RightSection = styled.div`
  position: absolute;
  top: 50%;
  right: 0;

  transform: translateY(-50%);
`;
