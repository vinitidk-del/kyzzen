import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Talent {
  id: string;
  name: string;
  email: string;
  role: string;
  specialty: string;
  rate_per_hour: number;
  bio: string;
  skills: string[];
  experience_years: number;
  availability: string;
  rating: number;
  reviews_count: number;
  avatar_url: string;
}

// Helper functions for styling
const getRoleColor = (role: string) => {
  switch (role) {
    case 'editor': return 'text-blue-600';
    case 'marketer': return 'text-green-600';
    case 'account_manager': return 'text-purple-600';
    case 'designer': return 'text-pink-600';
    case 'strategist': return 'text-orange-600';
    default: return 'text-gray-600';
  }
};

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'editor': return 'bg-blue-100 text-blue-800';
    case 'marketer': return 'bg-green-100 text-green-800';
    case 'account_manager': return 'bg-purple-100 text-purple-800';
    case 'designer': return 'bg-pink-100 text-pink-800';
    case 'strategist': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function TalentNetwork() {
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTalents();
  }, []);

  const fetchTalents = async () => {
    try {
      const { data, error } = await supabase
        .from('talents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTalents(data || []);
    } catch (error) {
      console.error('Error fetching talents:', error);
      toast.error('Failed to fetch talent profiles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading talent network...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Talent Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((talent) => (
              <Card key={talent.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedTalent(talent)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={talent.avatar_url} alt={talent.name} />
                        <AvatarFallback>{talent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{talent.name}</h3>
                        <p className="text-sm text-muted-foreground">{talent.specialty}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">${talent.rate_per_hour}/hr</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{talent.rating}</span>
                      <span className="text-xs text-muted-foreground">({talent.reviews_count} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Badge 
                      variant="outline"
                      className={`${getRoleBadgeColor(talent.role)} text-xs`}
                    >
                      {talent.role.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTalent(talent);
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {talents.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No talents registered yet
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedTalent} onOpenChange={() => setSelectedTalent(null)}>
        <DialogContent className="max-w-md">
          {selectedTalent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedTalent.avatar_url} alt={selectedTalent.name} />
                  <AvatarFallback>{selectedTalent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedTalent.name}</h2>
                  <p className="text-muted-foreground">{selectedTalent.specialty}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{selectedTalent.rating}</span>
                    <span className="text-xs text-muted-foreground">({selectedTalent.reviews_count} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rate:</span>
                  <span className="text-sm">${selectedTalent.rate_per_hour}/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Experience:</span>
                  <span className="text-sm">{selectedTalent.experience_years} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Availability:</span>
                  <Badge variant={selectedTalent.availability === 'available' ? 'default' : 'secondary'}>
                    {selectedTalent.availability}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Role:</span>
                  <Badge variant="outline" className={getRoleBadgeColor(selectedTalent.role)}>
                    {selectedTalent.role.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              {selectedTalent.skills && selectedTalent.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedTalent.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium mb-2">About:</p>
                <p className="text-sm text-muted-foreground">{selectedTalent.bio}</p>
              </div>
              
              <Button className="w-full">
                Contact {selectedTalent.name}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}