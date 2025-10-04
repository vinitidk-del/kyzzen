import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Brain, Calendar, ArrowUpDown, Copy, MoreVertical } from 'lucide-react';
import { CONTENT_PIPELINE } from '@/data/mockApi';
import { ContentTask } from '@/types/auth';
import { cn } from '@/lib/utils';
import { AIContentGenerator } from './AIContentGenerator';
import { toast } from '@/hooks/use-toast';
import { ContentTemplates } from '@/components/ContentTemplates';
import { Badge } from '@/components/ui/badge';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const columns = [
  { id: 'idea', label: 'Ideas', color: 'text-warning', tagColor: 'bg-warning/20 text-warning' },
  { id: 'scripting', label: 'Scripting', color: 'text-info', tagColor: 'bg-info/20 text-info' },
  { id: 'filming', label: 'Filming', color: 'text-accent', tagColor: 'bg-accent/20 text-accent' },
  { id: 'editing', label: 'Editing', color: 'text-warning', tagColor: 'bg-warning/20 text-warning' },
  { id: 'published', label: 'Published', color: 'text-success', tagColor: 'bg-success/20 text-success' }
];

const contentTypes = [
  { type: 'tutorial', label: 'Tutorial', color: 'bg-blue-500/20 text-blue-500' },
  { type: 'review', label: 'Review', color: 'bg-purple-500/20 text-purple-500' },
  { type: 'challenge', label: 'Challenge', color: 'bg-orange-500/20 text-orange-500' },
  { type: 'vlog', label: 'Vlog', color: 'bg-green-500/20 text-green-500' },
];

export function ContentHub() {
  const [pipeline, setPipeline] = useState(CONTENT_PIPELINE);
  const [draggedTask, setDraggedTask] = useState<ContentTask | null>(null);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [sortOrder, setSortOrder] = useState<'date' | 'priority'>('date');

  const duplicateTask = (task: ContentTask) => {
    const newTask: ContentTask = {
      ...task,
      id: `${task.id}-copy-${Date.now()}`,
      title: `${task.title} (Copy)`,
    };
    
    setPipeline(prev => ({
      ...prev,
      [task.status]: [...prev[task.status], newTask],
    }));
    
    toast({
      title: "Task Duplicated",
      description: `Created a copy of "${task.title}"`,
    });
  };

  const deleteTask = (task: ContentTask) => {
    setPipeline(prev => ({
      ...prev,
      [task.status]: prev[task.status].filter(t => t.id !== task.id),
    }));
    
    toast({
      title: "Task Deleted",
      description: `"${task.title}" has been removed`,
    });
  };

  const assignContentType = (task: ContentTask, type: string) => {
    toast({
      title: "Type Assigned",
      description: `"${task.title}" tagged as ${type}`,
    });
  };

  const handleSchedulePost = (taskTitle: string) => {
    toast({
      title: "Scheduling Post",
      description: `"${taskTitle}" has been scheduled for publishing.`,
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'date' ? 'priority' : 'date');
    toast({
      title: "Sort Order Changed",
      description: `Sorting by ${sortOrder === 'date' ? 'priority' : 'date'}`,
    });
  };

  const handleDragStart = (e: React.DragEvent, task: ContentTask) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTask) return;

    const sourceColumnId = draggedTask.status;
    if (sourceColumnId === targetColumnId) return;

    // Remove task from source column
    const updatedPipeline = { ...pipeline };
    updatedPipeline[sourceColumnId] = updatedPipeline[sourceColumnId].filter(
      task => task.id !== draggedTask.id
    );

    // Add task to target column
    const updatedTask = { ...draggedTask, status: targetColumnId as ContentTask['status'] };
    updatedPipeline[targetColumnId] = [...updatedPipeline[targetColumnId], updatedTask];

    setPipeline(updatedPipeline);
    setDraggedTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Content Pipeline</h1>
        <div className="flex gap-2">
          <Button
            onClick={toggleSortOrder}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort by {sortOrder}
          </Button>
          <Button
            onClick={() => setShowAIGenerator(!showAIGenerator)}
            variant={showAIGenerator ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            AI Generator
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const newTask = {
                id: `task-${Date.now()}`,
                title: `New Content Task`,
                status: 'idea' as const,
                priority: 'medium',
                createdAt: new Date().toISOString()
              };
              
              const updatedPipeline = { ...pipeline };
              updatedPipeline.idea = [...(updatedPipeline.idea || []), newTask];
              setPipeline(updatedPipeline);
              
              localStorage.setItem('contentPipeline', JSON.stringify(updatedPipeline));
              toast({
                title: "Task Added",
                description: "New task created in Ideas column",
              });
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>
      </div>
      
      {showAIGenerator && <AIContentGenerator />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="space-y-3">
            <Card className="bg-card/20 border-border">
              <CardHeader className="pb-3">
                <CardTitle className={cn("text-center font-bold capitalize", column.color)}>
                  {column.label}
                </CardTitle>
              </CardHeader>
              <CardContent
                className="min-h-[400px] space-y-3"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {pipeline[column.id]?.map((task) => {
                  const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
                  return (
                    <ContextMenu key={task.id}>
                      <ContextMenuTrigger>
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          onDragEnd={handleDragEnd}
                          className={cn(
                            "bg-secondary p-3 rounded-md shadow-card border border-border cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-accent hover:-translate-y-1",
                            draggedTask?.id === task.id && "opacity-50 rotate-1"
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm font-semibold text-foreground flex-1">{task.title}</p>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-popover">
                                <DropdownMenuItem onClick={() => duplicateTask(task)}>
                                  <Copy className="h-3 w-3 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteTask(task)} className="text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <Badge className={cn("text-xs mb-2", contentType.color)}>
                            {contentType.label}
                          </Badge>
                          
                          {column.id === 'editing' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs mt-2"
                              onClick={() => handleSchedulePost(task.title)}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              Schedule Post
                            </Button>
                          )}
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="bg-popover">
                        <ContextMenuItem onClick={() => duplicateTask(task)}>
                          <Copy className="h-3 w-3 mr-2" />
                          Duplicate Task
                        </ContextMenuItem>
                        {contentTypes.map(type => (
                          <ContextMenuItem key={type.type} onClick={() => assignContentType(task, type.label)}>
                            Tag as {type.label}
                          </ContextMenuItem>
                        ))}
                        <ContextMenuItem onClick={() => deleteTask(task)} className="text-destructive">
                          Delete Task
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  );
                })}
                
                {/* Drop zone indicator */}
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-8 text-center text-muted-foreground text-sm">
                  Drop tasks here
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}