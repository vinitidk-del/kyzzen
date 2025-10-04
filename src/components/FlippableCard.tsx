import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FlippableCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlippableCard({ front, back, className }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn("relative cursor-pointer perspective-1000", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "relative w-full h-full transition-transform duration-500 transform-style-3d",
        isFlipped && "rotate-y-180"
      )}>
        {/* Front */}
        <Card className={cn(
          "absolute w-full h-full backface-hidden",
          !isFlipped && "z-10"
        )}>
          {front}
        </Card>
        
        {/* Back */}
        <Card className={cn(
          "absolute w-full h-full backface-hidden rotate-y-180",
          isFlipped && "z-10"
        )}>
          {back}
        </Card>
      </div>
    </div>
  );
}
