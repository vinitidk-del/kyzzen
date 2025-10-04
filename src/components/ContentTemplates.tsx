import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Video, Image, Mic, Trophy, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const templates: ContentTemplate[] = [
  { id: 'challenge', name: 'Challenge', icon: <Trophy className="w-4 h-4" />, description: 'Viral challenge format' },
  { id: 'review', name: 'Product Review', icon: <MessageSquare className="w-4 h-4" />, description: 'Honest product review' },
  { id: 'tutorial', name: 'Tutorial', icon: <FileText className="w-4 h-4" />, description: 'Step-by-step guide' },
  { id: 'vlog', name: 'Vlog', icon: <Video className="w-4 h-4" />, description: 'Daily life content' },
  { id: 'shorts', name: 'Shorts/Reels', icon: <Image className="w-4 h-4" />, description: 'Short-form video' },
  { id: 'podcast', name: 'Podcast Clip', icon: <Mic className="w-4 h-4" />, description: 'Audio highlight' },
];

interface ContentTemplatesProps {
  onSelect?: (template: ContentTemplate) => void;
}

export function ContentTemplates({ onSelect }: ContentTemplatesProps) {
  const handleSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: "Template Selected",
        description: `Using ${template.name} template: ${template.description}`,
      });
      onSelect?.(template);
    }
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Use Template" />
      </SelectTrigger>
      <SelectContent>
        {templates.map((template) => (
          <SelectItem key={template.id} value={template.id}>
            <div className="flex items-center gap-2">
              {template.icon}
              <span>{template.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
