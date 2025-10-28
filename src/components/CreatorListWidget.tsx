import { ExternalLink, HelpCircle, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Creator {
  id: number;
  name: string;
  role: string;
  avatar: string;
  servicesAvailed: number;
}

interface CreatorListWidgetProps {
  creators: Creator[];
  totalCount: number;
}

export function CreatorListWidget({ creators, totalCount }: CreatorListWidgetProps) {
  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold">Creator List</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">Active creators in your network</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{totalCount.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto space-y-3">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm text-foreground">{creator.name}</p>
                <p className="text-xs text-muted-foreground">{creator.role}</p>
                <p className="text-xs text-muted-foreground">Campaigns: {creator.servicesAvailed}</p>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </button>
          </div>
        ))}
        <Button variant="outline" className="w-full">
          View all
        </Button>
      </CardContent>
    </Card>
  );
}
