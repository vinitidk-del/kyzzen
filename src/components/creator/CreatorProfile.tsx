import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Camera, Trophy, Flame, Star, Target, Zap, Award, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const achievements = [
  { id: 1, name: 'First Video', description: 'Posted your first content', icon: Star, unlocked: true },
  { id: 2, name: '100 Followers', description: 'Reached 100 followers', icon: Target, unlocked: true },
  { id: 3, name: 'Consistent Creator', description: '7 day posting streak', icon: Flame, unlocked: true },
  { id: 4, name: 'Viral Hit', description: 'Content reached 10K views', icon: Zap, unlocked: false },
  { id: 5, name: 'Community Builder', description: 'Engaged 1000 times', icon: Trophy, unlocked: false },
  { id: 6, name: 'Multi-Platform', description: 'Active on 3+ platforms', icon: Award, unlocked: true },
];

export function CreatorProfile() {
  const [profile, setProfile] = useState({
    displayName: 'Alex Creator',
    username: '@alexcreates',
    bio: 'Content creator and digital storyteller',
    timezone: 'America/New_York',
    currency: 'USD',
    avatar: '',
  });

  const [stats, setStats] = useState({
    level: 12,
    xp: 7840,
    xpToNext: 10000,
    streak: 15,
    longestStreak: 28,
    totalPosts: 147,
    creatorScore: 8.7,
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been changed",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Saved",
      description: "Your changes have been saved successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Creator Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-2xl">AC</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{profile.displayName}</h3>
                <p className="text-muted-foreground">{profile.username}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-primary/20 text-primary">Level {stats.level}</Badge>
                  <Badge className="bg-success/20 text-success">
                    <Flame className="w-3 h-3 mr-1" />
                    {stats.streak} day streak
                  </Badge>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label>Display Name</Label>
                <Input
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                />
              </div>

              <div>
                <Label>Username</Label>
                <Input
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                />
              </div>

              <div>
                <Label>Bio</Label>
                <Input
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Timezone</Label>
                  <Select value={profile.timezone} onValueChange={(v) => setProfile({ ...profile, timezone: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Currency</Label>
                  <Select value={profile.currency} onValueChange={(v) => setProfile({ ...profile, currency: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Achievements */}
        <div className="space-y-6">
          {/* Creator Stats */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Creator Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* XP Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Level {stats.level}</span>
                  <span className="text-foreground font-semibold">{stats.xp} / {stats.xpToNext} XP</span>
                </div>
                <Progress value={(stats.xp / stats.xpToNext) * 100} />
              </div>

              {/* Creator Score */}
              <div className="p-4 bg-card/50 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{stats.creatorScore}</div>
                <div className="text-sm text-muted-foreground">Creator Score</div>
                <Badge className="mt-2 bg-success/20 text-success">Top 15%</Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-card/50 rounded text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.streak}</div>
                  <div className="text-xs text-muted-foreground">Current Streak</div>
                </div>
                <div className="p-3 bg-card/50 rounded text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.longestStreak}</div>
                  <div className="text-xs text-muted-foreground">Longest Streak</div>
                </div>
                <div className="p-3 bg-card/50 rounded text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.totalPosts}</div>
                  <div className="text-xs text-muted-foreground">Total Posts</div>
                </div>
                <div className="p-3 bg-card/50 rounded text-center">
                  <div className="text-2xl font-bold text-foreground">{achievements.filter(a => a.unlocked).length}</div>
                  <div className="text-xs text-muted-foreground">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.unlocked
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-muted/50 border-border opacity-50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`p-2 rounded ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Icon className={`w-5 h-5 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-sm">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-success/20 text-success text-xs">Unlocked</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
