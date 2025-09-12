import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CONTENT_PIPELINE } from '@/data/mockApi';
import { ContentTask } from '@/types/auth';
import { cn } from '@/lib/utils';

const columns = [
  { id: 'idea', label: 'Ideas', color: 'text-warning' },
  { id: 'scripting', label: 'Scripting', color: 'text-info' },
  { id: 'filming', label: 'Filming', color: 'text-accent' },
  { id: 'editing', label: 'Editing', color: 'text-warning' },
  { id: 'published', label: 'Published', color: 'text-success' }
];

export function ContentHub() {
  const [pipeline, setPipeline] = useState(CONTENT_PIPELINE);
  const [draggedTask, setDraggedTask] = useState<ContentTask | null>(null);

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
      <h1 className="text-3xl font-bold text-foreground">Content Pipeline</h1>
      
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
                {pipeline[column.id]?.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragEnd={handleDragEnd}
                    className={cn(
                      "bg-secondary p-3 rounded-md shadow-card border border-border cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-accent hover:-translate-y-1",
                      draggedTask?.id === task.id && "opacity-50 rotate-1"
                    )}
                  >
                    <p className="text-sm font-semibold text-foreground">{task.title}</p>
                  </div>
                ))}
                
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