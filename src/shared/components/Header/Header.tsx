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
  margin-bottom: 24px;
  height: 36px;
  text-align: center;
  position: relative;
`;

const LeftSection = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const RightSection = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
