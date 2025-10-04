import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/components/LoginScreen';
import { AppLayout } from '@/components/AppLayout';
import { OnboardingWizard } from '@/components/OnboardingWizard';

const AppPage = () => {
  const { isAuthenticated } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
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

export default AppPage;
