import styled from '@emotion/styled';
import { useModalContext } from './ModalContext';
import ModalCloseButtonImage from '/close-button.png';

const ModalCloseButton = () => {
  const { onClose } = useModalContext();

  return (
    <StyledModalCloseButton
      type="button"
      aria-label="모달 닫기 버튼"
      onClick={onClose}
    >
      <img src={ModalCloseButtonImage} alt="모달 닫기 버튼" />
    </StyledModalCloseButton>
  );
};

const StyledModalCloseButton = styled.button`
  border: none;

  background: none;

  cursor: pointer;
`;

export default ModalCloseButton;
