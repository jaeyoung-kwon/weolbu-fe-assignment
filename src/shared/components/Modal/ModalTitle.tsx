import type { PropsWithChildren } from 'react';
import { Text } from '../Text';

const ModalTitle = ({ children }: PropsWithChildren) => {
  return (
    <Text as="h2" size="xl" weight="bold">
      {children}
    </Text>
  );
};

export default ModalTitle;
