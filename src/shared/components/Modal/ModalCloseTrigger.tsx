import {
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { useModalContext } from './ModalContext';

interface ModalCloseTriggerProps {
  asChild?: boolean;
}

const ModalCloseTrigger = ({
  asChild,
  children,
}: PropsWithChildren<ModalCloseTriggerProps>) => {
  const { onClose } = useModalContext();

  if (!asChild) {
    return (
      <button type="button" onClick={onClose} aria-label="모달 열기 버튼">
        {children}
      </button>
    );
  }

  if (!isValidElement(children)) {
    throw new Error(
      '[Modal.CloseTrigger] asChild 사용 시 자식은 하나의 ReactElement여야 합니다.',
    );
  }

  const element = children as ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
  }>;
  const originalOnClick = element.props.onClick;

  return cloneElement(element, {
    onClick: (event: React.MouseEvent) => {
      if (typeof originalOnClick === 'function') {
        originalOnClick(event);
      }
      onClose();
    },
  });
};

export default ModalCloseTrigger;
