import React, { useState } from 'react';
import { User, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { authenticateUser } from '@/data/mockApi';
import { UserRole } from '@/types/auth';
import kyzzenLogo from '@/assets/kyzzen-logo.png';

const roleLabels = {
  creator: 'Creator',
  agency: 'Agency',
  business: 'Business'
} as const;

export function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = authenticateUser(username, password, selectedRole);
      if (user) {
        login(user);
      } else {
        setError('Invalid credentials for this role.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={kyzzenLogo} alt="Kyzzen Media Logo" className="w-12 h-12 mr-3 rounded-lg" />
            <h1 className="text-4xl font-extrabold text-foreground">Kyzzen Media</h1>
          </div>
          <p className="text-muted-foreground">The operating system for creator empires.</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-border p-8 shadow-2xl">
          <div className="flex border-b border-border mb-6">
            {(Object.keys(roleLabels) as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex-1 pb-3 font-semibold text-lg transition-all duration-200 border-b-2 ${
                  selectedRole === role
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-3 shadow-primary hover:shadow-primary-hover transition-all duration-300 hover:-translate-y-1"
            >
              {isLoading ? 'Accessing...' : 'Access Dashboard'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-muted-foreground text-sm mt-6">
          &copy; 2025 Kyzzen Media. All rights reserved.
        </p>
      </div>
    </div>
  );
}