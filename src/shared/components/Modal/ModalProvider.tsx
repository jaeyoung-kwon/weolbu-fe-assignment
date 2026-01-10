import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { ModalContext } from './ModalContext';

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const value = useMemo(
    () => ({ open, onClose, onOpen }),
    [open, onClose, onOpen],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
