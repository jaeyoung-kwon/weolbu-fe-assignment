import { useEffect } from 'react';

export const useModalAccessibility = (
  open: boolean,
  onClose: () => void,
  modalRef: React.RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    if (!open) return;

    const allFocusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const focusableList = Array.from(allFocusable || []).filter(
      (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1,
    );

    if (focusableList.length > 0) {
      const firstFocusable = focusableList[0];
      const isFirstButtonCloseButton =
        firstFocusable.getAttribute('aria-label') === '모달 닫기 버튼';

      (isFirstButtonCloseButton ? focusableList[1] : firstFocusable)?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !focusableList.length) return;

      const firstElement = focusableList[0];
      const lastElement = focusableList[focusableList.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, modalRef]);
};
