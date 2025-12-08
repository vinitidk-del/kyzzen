import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'manager' | 'viewer';
  avatar: string;
  status: 'active' | 'invited';
  hoursLogged: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

const initialTeam: TeamMember[] = [
  { id: '1', name: 'You', email: 'creator@kaizen.app', role: 'owner', avatar: '', status: 'active', hoursLogged: 156 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@kaizen.app', role: 'editor', avatar: '', status: 'active', hoursLogged: 124 },
  { id: '3', name: 'Mike Torres', email: 'mike@kaizen.app', role: 'manager', avatar: '', status: 'active', hoursLogged: 98 },
  { id: '4', name: 'Emily Davis', email: 'emily@kaizen.app', role: 'viewer', avatar: '', status: 'invited', hoursLogged: 0 },
];

const initialTasks: Task[] = [
  { id: '1', title: 'Edit Q2 Review Video', description: 'Final cut with transitions', assignedTo: 'Sarah Chen', deadline: '2025-04-20', status: 'in-progress', priority: 'high' },
  { id: '2', title: 'Write YouTube Description', description: 'SEO optimized copy', assignedTo: 'Mike Torres', deadline: '2025-04-18', status: 'review', priority: 'medium' },
  { id: '3', title: 'Create Thumbnail Mockups', description: '3 variations', assignedTo: 'Sarah Chen', deadline: '2025-04-22', status: 'pending', priority: 'high' },
  { id: '4', title: 'Schedule Social Posts', description: 'TikTok + Instagram', assignedTo: 'Mike Torres', deadline: '2025-04-19', status: 'completed', priority: 'low' },
];

export function TeamCollaboration() {
  const [team, setTeam] = useState(initialTeam);
  const [tasks, setTasks] = useState(initialTasks);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'viewer' as TeamMember['role'] });
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '', deadline: '', priority: 'medium' as Task['priority'] });

  const inviteMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember,
      avatar: '',
      status: 'invited',
      hoursLogged: 0,
    };

    setTeam([...team, member]);
    setShowInviteDialog(false);
    setNewMember({ name: '', email: '', role: 'viewer' });

    toast({
      title: "Invitation Sent",
      description: `Invited ${newMember.name} as ${newMember.role}`,
    });
  };

  const createTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      status: 'pending',
    };

    setTasks([...tasks, task]);
    setShowTaskDialog(false);
    setNewTask({ title: '', description: '', assignedTo: '', deadline: '', priority: 'medium' });

    toast({
      title: "Task Created",
      description: `Assigned to ${newTask.assignedTo}`,
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    toast({
      title: "Task Updated",
      description: `Status changed to ${newStatus}`,
    });
  };

  const getRoleBadgeColor = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner': return 'bg-accent/20 text-accent';
      case 'editor': return 'bg-success/20 text-success';
      case 'manager': return 'bg-info/20 text-info';
      case 'viewer': return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-error/20 text-error border-error';
      case 'medium': return 'bg-warning/20 text-warning border-warning';
      case 'low': return 'bg-info/20 text-info border-info';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-warning animate-pulse" />;
      case 'review': return <AlertCircle className="w-5 h-5 text-info" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Team Collaboration</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTaskDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
          <Button onClick={() => setShowInviteDialog(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="text-center">
              <p className="text-4xl font-bold text-info">{team.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Team Members</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="text-center">
              <p className="text-4xl font-bold text-success">{tasks.filter(t => t.status === 'completed').length}</p>
              <p className="text-sm text-muted-foreground mt-1">Tasks Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="text-center">
              <p className="text-4xl font-bold text-warning">{tasks.filter(t => t.status === 'in-progress').length}</p>
              <p className="text-sm text-muted-foreground mt-1">In Progress</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{team.reduce((sum, m) => sum + m.hoursLogged, 0)}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Hours</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {team.map(member => (
              <div key={member.id} className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border hover:border-accent transition-colors">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <Badge className={getRoleBadgeColor(member.role)}>{member.role}</Badge>
                    {member.status === 'invited' && (
                      <Badge className="bg-warning/20 text-warning">Pending</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  {member.hoursLogged > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {member.hoursLogged}h logged
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks Board */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Active Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.filter(t => t.status !== 'completed').map(task => (
              <div key={task.id} className="p-4 bg-card/50 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="flex items-start gap-3">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{task.title}</h3>
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Assigned to: <span className="font-medium text-foreground">{task.assignedTo}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {task.status === 'pending' && (
                        <Button size="sm" variant="outline" onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                          Start
                        </Button>
                      )}
                      {task.status === 'in-progress' && (
                        <Button size="sm" variant="outline" onClick={() => updateTaskStatus(task.id, 'review')}>
                          Submit for Review
                        </Button>
                      )}
                      {task.status === 'review' && (
                        <Button size="sm" onClick={() => updateTaskStatus(task.id, 'completed')}>
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Completed Tasks */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.filter(t => t.status === 'completed').map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-semibold text-foreground">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.assignedTo}</p>
                  </div>
                </div>
                <Badge className="bg-success/20 text-success">Completed</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={newMember.role} onValueChange={(value: TeamMember['role']) => setNewMember({ ...newMember, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer - View only access</SelectItem>
                  <SelectItem value="editor">Editor - Can edit content</SelectItem>
                  <SelectItem value="manager">Manager - Full management access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={inviteMember} className="flex-1">Send Invitation</Button>
              <Button variant="outline" onClick={() => setShowInviteDialog(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Task Title</Label>
              <Input
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g., Edit intro sequence"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Task details..."
              />
            </div>
            <div>
              <Label>Assign To</Label>
              <Select value={newTask.assignedTo} onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {team.filter(m => m.status === 'active').map(member => (
                    <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Deadline</Label>
              <Input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={createTask} className="flex-1">Create Task</Button>
              <Button variant="outline" onClick={() => setShowTaskDialog(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}