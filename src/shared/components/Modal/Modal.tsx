import { useClickOutsideRef } from '@/shared/hooks/useClickOutsideRef';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import styled from '@emotion/styled';
import { type PropsWithChildren } from 'react';
import ModalButtonGroup from './ModalButtonGroup';
import ModalCloseButton from './ModalCloseButton';
import ModalCloseTrigger from './ModalCloseTrigger';
import { useModalContext } from './ModalContext';
import ModalOpenTrigger from './ModalOpenTrigger';
import ModalPrimaryButton from './ModalPrimaryButton';
import { ModalProvider } from './ModalProvider';
import ModalSecondaryButton from './ModalSecondaryButton';
import ModalTitle from './ModalTitle';
import { useModalAccessibility } from './useModalAccessibility';

export interface ModalProps {
  title?: string;
  showCloseButton?: boolean;
}

const ModalContainer = ({
  title = '',
  showCloseButton = true,
  children,
}: PropsWithChildren<ModalProps>) => {
  const { open, onClose } = useModalContext();

  const modalRef = useClickOutsideRef<HTMLDivElement>(onClose);
  useScrollLock(open);
  useModalAccessibility(open, onClose, modalRef);

  return (
    open && (
      <StyledModalContainer>
        <StyledModalContent ref={modalRef} role="dialog" aria-modal="true">
          {title && <ModalTitle>{title}</ModalTitle>}
          {showCloseButton && (
            <FixedCloseButtonWrapper>
              <ModalCloseButton />
            </FixedCloseButtonWrapper>
          )}
          {children}
        </StyledModalContent>
      </StyledModalContainer>
    )
  );
};

const StyledModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const StyledModalContent = styled.div`
  width: calc(100vw - 72px);
  min-width: 400px;
  display: flex;
  flex-direction: column;

  position: relative;
  padding: 24px 32px;
  box-sizing: border-box;
  background-color: white;

  gap: 24px;
  border-radius: 8px;
`;

const FixedCloseButtonWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 32px;
`;

const Modal = Object.assign(ModalProvider, {
  OpenTrigger: ModalOpenTrigger,
  CloseTrigger: ModalCloseTrigger,
  Container: ModalContainer,
  Title: ModalTitle,
  CloseButton: ModalCloseButton,
  ButtonGroup: ModalButtonGroup,
  PrimaryButton: ModalPrimaryButton,
  SecondaryButton: ModalSecondaryButton,
});

export default Modal;
