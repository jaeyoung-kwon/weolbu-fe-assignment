import type { PropsWithChildren } from 'react';
import { Flex } from '../Flex';

const ModalButtonGroup = ({ children }: PropsWithChildren) => {
  return (
    <Flex justify="flex-end" gap={12} align="center">
      {children}
    </Flex>
  );
};

export default ModalButtonGroup;
