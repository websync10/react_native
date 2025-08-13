import React, { createContext, useCallback, useContext, useState } from 'react';

interface ProfileRefreshContextType {
  refreshTrigger: number;
  triggerProfileRefresh: () => void;
}

const ProfileRefreshContext = createContext<ProfileRefreshContextType | undefined>(undefined);

export const useProfileRefresh = () => {
  const context = useContext(ProfileRefreshContext);
  if (!context) {
    throw new Error('useProfileRefresh must be used within a ProfileRefreshProvider');
  }
  return context;
};

interface ProfileRefreshProviderProps {
  children: React.ReactNode;
}

export const ProfileRefreshProvider: React.FC<ProfileRefreshProviderProps> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerProfileRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <ProfileRefreshContext.Provider value={{ refreshTrigger, triggerProfileRefresh }}>
      {children}
    </ProfileRefreshContext.Provider>
  );
};
