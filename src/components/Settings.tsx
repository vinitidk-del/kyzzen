import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings as SettingsIcon, User, Bell, Palette, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function Settings({ children }: { children?: React.ReactNode }) {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      deals: true,
      analytics: true,
      messages: true,
    },
    theme: 'system',
    language: 'en',
    privacy: {
      publicProfile: true,
      showStats: true,
      showContacts: false,
    }
  });

  const handleToggle = (category: 'notifications' | 'privacy', key: string) => {
    setSettings(prev => {
      const categoryData = prev[category];
      return {
        ...prev,
        [category]: {
          ...categoryData,
          [key]: !(categoryData as any)[key]
        }
      };
    });
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
  };

  const handleSave = () => {
    toast({
      title: "All settings saved",
      description: "Your preferences have been updated successfully.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            <SettingsIcon className="w-5 h-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />Profile</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />Notifications</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2" />Appearance</TabsTrigger>
            <TabsTrigger value="privacy"><Shield className="w-4 h-4 mr-2" />Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={profile?.full_name || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle">Handle</Label>
              <Input id="handle" defaultValue={profile?.username || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" defaultValue="Creator & Entrepreneur" />
            </div>
            <Button onClick={handleSave}>Save Profile</Button>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch 
                checked={settings.notifications.email}
                onCheckedChange={() => handleToggle('notifications', 'email')}
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Browser notifications</p>
              </div>
              <Switch 
                checked={settings.notifications.push}
                onCheckedChange={() => handleToggle('notifications', 'push')}
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Brand Deal Updates</p>
                <p className="text-sm text-muted-foreground">Notify about new deals</p>
              </div>
              <Switch 
                checked={settings.notifications.deals}
                onCheckedChange={() => handleToggle('notifications', 'deals')}
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Analytics Reports</p>
                <p className="text-sm text-muted-foreground">Weekly performance reports</p>
              </div>
              <Switch 
                checked={settings.notifications.analytics}
                onCheckedChange={() => handleToggle('notifications', 'analytics')}
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Messages</p>
                <p className="text-sm text-muted-foreground">New message notifications</p>
              </div>
              <Switch 
                checked={settings.notifications.messages}
                onCheckedChange={() => handleToggle('notifications', 'messages')}
              />
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select defaultValue={settings.theme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue={settings.language}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave}>Save Appearance</Button>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 mt-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
              </div>
              <Switch 
                checked={settings.privacy.publicProfile}
                onCheckedChange={() => handleToggle('privacy', 'publicProfile')}
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Show Statistics</p>
                <p className="text-sm text-muted-foreground">Display follower counts and engagement</p>
              </div>
              <Switch 
                checked={settings.privacy.showStats}
                onCheckedChange={() => handleToggle('privacy', 'showStats')}
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Show Contact Info</p>
                <p className="text-sm text-muted-foreground">Display email and social links</p>
              </div>
              <Switch 
                checked={settings.privacy.showContacts}
                onCheckedChange={() => handleToggle('privacy', 'showContacts')}
              />
            </div>
            <Button onClick={handleSave}>Save Privacy Settings</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
