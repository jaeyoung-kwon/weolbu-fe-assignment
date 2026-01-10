import { createContext, useContext } from 'react';

type ModalContextType = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'Modal의 하위 컴포넌트들은 Modal 컴포넌트 내부에서만 렌더링할 수 있습니다.',
    );
  }

  return context;
}
