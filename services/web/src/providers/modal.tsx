import React from "react";

type Context = {
  modal: React.ReactNode | null;
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
};

const initialContext: Context = {
  modal: null,
  setModal: () => undefined,
};

export const modalContext = React.createContext(initialContext.modal);
export const setModalContext = React.createContext(initialContext.setModal);

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [modal, setModal] = React.useState(initialContext.modal);

  return (
    <modalContext.Provider value={modal}>
      <setModalContext.Provider value={setModal}>
        {children}
      </setModalContext.Provider>
    </modalContext.Provider>
  );
};
