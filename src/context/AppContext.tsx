import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  sidebarState: boolean;
  toggleSidebarState: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  const toggleSidebarState = () => {
    setSidebarState(!sidebarState);
  };

  const value: AppContextType = {
    sidebarState,
    toggleSidebarState,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
