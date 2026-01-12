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

export interface ModalProps {
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

const ModalContainer = ({
  title = '',
  showCloseButton = true,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  const { open, onClose: closeModal } = useModalContext();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const modalRef = useClickOutsideRef<HTMLDivElement>(handleClose);
  useScrollLock(open);

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
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(0 0 0 / 35%);
`;

const StyledModalContent = styled.div`
  position: relative;
  width: calc(100vw - 72px);
  min-width: 400px;
  padding: 24px 32px;
  border-radius: 8px;

  display: flex;
  gap: 24px;
  flex-direction: column;

  background-color: white;

  box-sizing: border-box;
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
