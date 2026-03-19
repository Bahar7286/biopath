'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Map,
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  Trash2,
  RefreshCw,
  Calendar,
  Target,
  Flag,
  BookOpen,
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  resources: string[];
}

interface Roadmap {
  id: string;
  goal: string;
  description: string;
  timeframe: string;
  tasks: Task[];
  createdAt: Date;
  progress: number;
}

const TIMEFRAME_OPTIONS = [
  { value: '1-month', label: '1 Month' },
  { value: '3-months', label: '3 Months' },
  { value: '6-months', label: '6 Months' },
  { value: '1-year', label: '1 Year' },
  { value: 'ongoing', label: 'Ongoing' },
];

const PRIORITY_COLORS = {
  high: 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
};

export default function RoadmapPage() {
  const [formData, setFormData] = useState({
    goal: '',
    description: '',
    timeframe: '3-months',
  });

  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeframeChange = (value: string) => {
    setFormData(prev => ({ ...prev, timeframe: value }));
  };

  const generateRoadmap = async () => {
    if (!formData.goal) {
      alert('Please enter your goal');
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI-generated tasks
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Research and Planning',
          description: 'Understand the goal requirements and create an action plan',
          completed: false,
          priority: 'high',
          resources: ['Dev.to', 'Medium'],
        },
        {
          id: '2',
          title: 'Setup Foundation',
          description: 'Create project structure and initial setup',
          completed: false,
          priority: 'high',
          resources: ['GitHub', 'Documentation'],
        },
        {
          id: '3',
          title: 'Core Development',
          description: 'Develop main features and functionality',
          completed: false,
          priority: 'high',
          resources: ['Docs', 'Tutorials'],
        },
        {
          id: '4',
          title: 'Testing & Refinement',
          description: 'Test functionality and refine based on feedback',
          completed: false,
          priority: 'medium',
          resources: ['Testing Guide'],
        },
        {
          id: '5',
          title: 'Documentation',
          description: 'Create comprehensive documentation',
          completed: false,
          priority: 'medium',
          resources: ['Writing Guide'],
        },
        {
          id: '6',
          title: 'Launch & Iterate',
          description: 'Launch to users and gather feedback for improvements',
          completed: false,
          priority: 'low',
          resources: ['Launch Guide'],
        },
      ];

      const newRoadmap: Roadmap = {
        id: Date.now().toString(),
        goal: formData.goal,
        description: formData.description,
        timeframe: formData.timeframe,
        tasks: mockTasks,
        createdAt: new Date(),
        progress: 0,
      };

      setRoadmaps(prev => [newRoadmap, ...prev]);
      setSelectedRoadmapId(newRoadmap.id);
      setFormData({ goal: '', description: '', timeframe: '3-months' });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Failed to generate roadmap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTaskCompletion = (roadmapId: string, taskId: string) => {
    setRoadmaps(prev =>
      prev.map(rm => {
        if (rm.id === roadmapId) {
          const updatedTasks = rm.tasks.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          );
          const progress = Math.round(
            (updatedTasks.filter(t => t.completed).length / updatedTasks.length) * 100
          );
          return { ...rm, tasks: updatedTasks, progress };
        }
        return rm;
      })
    );
  };

  const deleteRoadmap = (roadmapId: string) => {
    setRoadmaps(prev => prev.filter(rm => rm.id !== roadmapId));
    if (selectedRoadmapId === roadmapId) {
      setSelectedRoadmapId(null);
    }
  };

  const currentRoadmap = roadmaps.find(rm => rm.id === selectedRoadmapId);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <Map className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl font-bold">Smart Roadmap Builder</h1>
        </div>
        <p className="text-muted-foreground">
          Create AI-powered roadmaps to achieve your goals. Break objectives into actionable tasks.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Generator Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 border-border/50 sticky top-24">
            <h2 className="text-lg font-semibold mb-6">Create Roadmap</h2>

            <div className="space-y-5">
              {/* Goal */}
              <div className="space-y-2">
                <Label htmlFor="goal">Your Goal *</Label>
                <Input
                  id="goal"
                  name="goal"
                  placeholder="e.g., Learn Machine Learning"
                  value={formData.goal}
                  onChange={handleFormChange}
                  disabled={isGenerating}
                  className="bg-background border-border/50"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Add more context about your goal"
                  value={formData.description}
                  onChange={handleFormChange}
                  disabled={isGenerating}
                  className="bg-background border-border/50 resize-none h-20"
                />
              </div>

              {/* Timeframe */}
              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe</Label>
                <Select
                  value={formData.timeframe}
                  onValueChange={handleTimeframeChange}
                >
                  <SelectTrigger className="bg-background border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEFRAME_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateRoadmap}
                disabled={isGenerating}
                className="w-full bg-accent hover:bg-accent/90 mt-6"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Roadmap
                  </>
                )}
              </Button>

              {/* Info */}
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground">
                  💡 AI will break down your goal into tasks with resources and timeline
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Roadmaps List & Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          {roadmaps.length === 0 ? (
            <Card className="p-12 border-border/50 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mb-4 inline-flex p-4 rounded-full bg-accent/10"
              >
                <Target className="w-8 h-8 text-accent" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">No roadmaps yet</h3>
              <p className="text-muted-foreground">
                Create your first roadmap to get started with your goals
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Roadmaps Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {roadmaps.map((roadmap, index) => (
                  <motion.button
                    key={roadmap.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedRoadmapId(roadmap.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                      selectedRoadmapId === roadmap.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {roadmap.goal.substring(0, 20)}
                    {roadmap.goal.length > 20 ? '...' : ''}
                  </motion.button>
                ))}
              </div>

              {/* Roadmap Details */}
              {currentRoadmap && (
                <motion.div
                  key={currentRoadmap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{currentRoadmap.goal}</h2>
                        {currentRoadmap.description && (
                          <p className="text-muted-foreground">{currentRoadmap.description}</p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteRoadmap(currentRoadmap.id)}
                        className="border-border/50"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{currentRoadmap.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentRoadmap.progress}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex gap-4 mt-4 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {TIMEFRAME_OPTIONS.find(t => t.value === currentRoadmap.timeframe)?.label}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Flag className="w-4 h-4" />
                        {currentRoadmap.tasks.filter(t => t.completed).length}/
                        {currentRoadmap.tasks.length} tasks
                      </div>
                    </div>
                  </Card>

                  {/* Tasks */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Tasks</h3>
                    {currentRoadmap.tasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => toggleTaskCompletion(currentRoadmap.id, task.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          task.completed
                            ? 'border-primary/30 bg-primary/5 opacity-60'
                            : 'border-border/30 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex-shrink-0 mt-1"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4
                                className={`font-semibold ${
                                  task.completed ? 'line-through text-muted-foreground' : ''
                                }`}
                              >
                                {task.title}
                              </h4>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full border ${
                                  PRIORITY_COLORS[task.priority]
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>
                            <p
                              className={`text-sm mb-2 ${
                                task.completed ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {task.description}
                            </p>

                            {/* Resources */}
                            {task.resources.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {task.resources.map((resource, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs px-2 py-1 rounded-full bg-background border border-border/50 flex items-center gap-1 text-muted-foreground"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    {resource}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
