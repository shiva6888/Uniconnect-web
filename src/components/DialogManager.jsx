import React, { useState, createContext, useContext } from 'react';

// Create a context for managing dialogs
const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    dialogType: null,
    dialogProps: {}
  });

  const openDialog = (dialogType, dialogProps = {}) => {
    setDialogState({
      isOpen: true,
      dialogType,
      dialogProps
    });
  };

  const closeDialog = () => {
    setDialogState({
      ...dialogState,
      isOpen: false
    });
  };

  return (
    <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);