import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Edit, Mail, Calendar, MapPin, TrendingUp, Users, Star } from 'lucide-react';

export function AccountPreview({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-accent">
            Account Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={profile.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.username}
                  alt={profile.full_name || 'User'}
                  className="w-20 h-20 rounded-full border-4 border-accent"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-foreground">{profile.full_name || profile.username}</h2>
                  <p className="text-lg text-accent">@{profile.username}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {profile.roles.map((role) => (
                      <Badge 
                        key={role}
                        variant={role === profile.activeRole ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          {profile.roles.includes('creator') && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-secondary/20">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="text-xl font-bold text-foreground">46.6M</p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/20">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-success" />
                  <p className="text-sm text-muted-foreground">Avg Views</p>
                  <p className="text-xl font-bold text-foreground">245K</p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/20">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-warning" />
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-xl font-bold text-foreground">9.8%</p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/20">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-info" />
                  <p className="text-sm text-muted-foreground">Content</p>
                  <p className="text-xl font-bold text-foreground">1.2K</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Details */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-foreground">
                Profile Information
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Handle</p>
                    <p className="font-medium text-foreground">@{profile.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium text-foreground">March 2023</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="secondary" className="bg-success/20 text-success">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}