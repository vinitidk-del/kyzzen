import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/AppLayout';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return <AppLayout />;
};

export default Index;
