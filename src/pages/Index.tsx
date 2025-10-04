import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/components/LoginScreen';
import { AppLayout } from '@/components/AppLayout';
import { OnboardingWizard } from '@/components/OnboardingWizard';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show onboarding for first-time users (checking localStorage)
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (isAuthenticated && !hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);

  const handleOnboardingClose = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <>
      <AppLayout />
      <OnboardingWizard open={showOnboarding} onClose={handleOnboardingClose} />
    </>
  );
};

export default Index;
