import React from "react";

type Context = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext: Context = {
  loading: false,
  setLoading: () => undefined,
};

export const loadingContext = React.createContext(initialContext.loading);
export const setLoadingContext = React.createContext(initialContext.setLoading);

export const LoadingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(initialContext.loading);

  return (
    <loadingContext.Provider value={loading}>
      <setLoadingContext.Provider value={setLoading}>
        {children}
      </setLoadingContext.Provider>
    </loadingContext.Provider>
  );
};
