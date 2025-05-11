import React, { createContext, useContext, useState } from 'react';

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [dialogState, setDialogState] = useState({ isOpen: false, dialogType: '' });

  const openDialog = (dialogType) => {
    setDialogState({ isOpen: true, dialogType });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, dialogType: '' });
  };

  return (
    <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}