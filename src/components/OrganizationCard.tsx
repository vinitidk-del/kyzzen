import { Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface OrganizationCardProps {
  organizationName: string;
  partnerName: string;
  logo?: string;
}

export function OrganizationCard({ organizationName, partnerName, logo }: OrganizationCardProps) {
  return (
    <Card className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-3">
        {logo ? (
          <img src={logo} alt={organizationName} className="w-10 h-10 rounded-lg object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-bold text-foreground text-sm">{organizationName} x {partnerName}</h3>
          <p className="text-xs text-muted-foreground">Our partner</p>
        </div>
      </div>
    </Card>
  );
}
