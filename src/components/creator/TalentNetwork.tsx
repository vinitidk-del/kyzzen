import React, { useState } from 'react';
import { Star, MessageCircle, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TALENT_NETWORK } from '@/data/mockApi';
import { TalentMember } from '@/types/auth';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export function TalentNetwork() {
  const [selectedTalent, setSelectedTalent] = useState<TalentMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const filteredTalent = TALENT_NETWORK.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || talent.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleSendMessage = (talentName: string) => {
    toast({
      title: "Message Sent",
      description: `Your message to ${talentName} has been sent successfully.`,
    });
    setSelectedTalent(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'editor': return 'text-accent';
      case 'manager': return 'text-success';
      case 'designer': return 'text-info';
      case 'strategist': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'editor': return 'bg-accent/20 text-accent';
      case 'manager': return 'bg-success/20 text-success';
      case 'designer': return 'bg-info/20 text-info';
      case 'strategist': return 'bg-warning/20 text-warning';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Talent Network</h1>
      
      {/* Search and Filters */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Role:</span>
              <div className="flex gap-2">
                {[null, 'editor', 'manager', 'designer', 'strategist'].map(role => (
                  <Button
                    key={role || 'all'}
                    variant={roleFilter === role ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setRoleFilter(role)}
                    className="capitalize"
                  >
                    {role || 'All'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalent.map((talent) => (
          <Card 
            key={talent.id}
            className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-2 shadow-card cursor-pointer group"
            onClick={() => setSelectedTalent(talent)}
          >
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <img
                  src={talent.avatar}
                  alt={talent.name}
                  className="w-20 h-20 rounded-full mx-auto border-2 border-border group-hover:border-accent transition-colors duration-300"
                />
                <div className={cn(
                  "absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-semibold capitalize",
                  getRoleBadgeColor(talent.role)
                )}>
                  {talent.role}
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-foreground mb-1">{talent.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{talent.specialty}</p>
              <p className="text-accent font-semibold text-lg mb-3">{talent.rate}</p>
              
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(talent.rating) ? "text-accent fill-accent" : "text-muted-foreground"
                    )}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({talent.reviews} reviews)
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
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

      {/* Talent Detail Modal */}
      <Dialog open={!!selectedTalent} onOpenChange={() => setSelectedTalent(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          {selectedTalent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedTalent.avatar}
                    alt={selectedTalent.name}
                    className="w-16 h-16 rounded-full border-2 border-accent"
                  />
                  <div>
                    <DialogTitle className="text-xl font-bold text-foreground">
                      {selectedTalent.name}
                    </DialogTitle>
                    <p className={cn("font-semibold capitalize", getRoleColor(selectedTalent.role))}>
                      {selectedTalent.specialty}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="text-accent font-bold text-lg">{selectedTalent.rate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(selectedTalent.rating) ? "text-accent fill-accent" : "text-muted-foreground"
                        )}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {selectedTalent.rating}/5 ({selectedTalent.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">About</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedTalent.bio}
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-primary"
                  onClick={() => handleSendMessage(selectedTalent.name)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}