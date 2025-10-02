import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/components/LoginScreen';
import { AppLayout } from '@/components/AppLayout';

const AppPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <AppLayout />;
};

export default AppPage;
