'use client';

import { Card } from '@/components/ui/card';
import {
  DndContext,
  rectIntersection,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Shield, Brain, Car, Plus, Lightbulb, Zap, Users } from 'lucide-react';

function cn(...args: any[]) {
  return args.filter(Boolean).join(' ');
}

export type Status = {
  id: string;
  name: string;
  color: string;
};

export type Feature = {
  id: string;
  name: string;
  description?: string;
  status: Status;
  icon?: ReactNode;
  priority?: 'high' | 'medium' | 'low';
};

export type KanbanBoardProps = {
  id: Status['id'];
  children: ReactNode;
  className?: string;
};

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      className={cn(
        'flex h-full min-h-96 flex-col gap-3 rounded-lg border-2 bg-background/50 p-4 shadow-sm transition-all duration-200',
        isOver ? 'border-primary bg-primary/5' : 'border-border',
        className
      )}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export type KanbanCardProps = Pick<Feature, 'id' | 'name'> & {
  index: number;
  parent: string;
  children?: ReactNode;
  className?: string;
  description?: string;
  icon?: ReactNode;
  priority?: 'high' | 'medium' | 'low';
};

export const KanbanCard = ({
  id,
  name,
  index,
  parent,
  children,
  className,
  description,
  icon,
  priority,
}: KanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { index, parent },
    });

  const priorityColors = {
    high: 'border-l-red-500 bg-red-50/50 dark:bg-red-950/20',
    medium: 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20',
    low: 'border-l-green-500 bg-green-50/50 dark:bg-green-950/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'rounded-lg p-4 shadow-sm border-l-4 cursor-grab hover:shadow-md transition-all duration-200',
          isDragging && 'cursor-grabbing opacity-50 rotate-2',
          priority && priorityColors[priority],
          className
        )}
        style={{
          transform: transform
            ? `translateX(${transform.x}px) translateY(${transform.y}px)`
            : 'none',
        }}
        {...listeners}
        {...attributes}
        ref={setNodeRef}
      >
        {children ?? (
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              {icon && (
                <div className="flex-shrink-0 p-1 rounded-md bg-primary/10 text-primary">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground leading-tight">
                  {name}
                </h4>
                {description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {priority && (
              <div className="flex justify-end">
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full font-medium',
                  priority === 'high' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                  priority === 'medium' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
                  priority === 'low' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                )}>
                  {priority}
                </span>
              </div>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export type KanbanCardsProps = {
  children: ReactNode;
  className?: string;
};

export const KanbanCards = ({ children, className }: KanbanCardsProps) => (
  <div className={cn('flex flex-1 flex-col gap-3', className)}>{children}</div>
);

export type KanbanHeaderProps =
  | {
      children: ReactNode;
    }
  | {
      name: Status['name'];
      color: Status['color'];
      count?: number;
      className?: string;
    };

export const KanbanHeader = (props: KanbanHeaderProps) =>
  'children' in props ? (
    props.children
  ) : (
    <div className={cn('flex items-center justify-between mb-4', props.className)}>
      <div className="flex items-center gap-3">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: props.color }}
        />
        <h3 className="font-bold text-lg text-foreground">{props.name}</h3>
      </div>
      {props.count !== undefined && (
        <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-sm font-medium">
          {props.count}
        </span>
      )}
    </div>
  );

export type KanbanProviderProps = {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  className?: string;
};

export const KanbanProvider = ({
  children,
  onDragEnd,
  className,
}: KanbanProviderProps) => (
  <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
    <div
      className={cn('grid w-full auto-cols-fr grid-flow-col gap-6 p-6', className)}
    >
      {children}
    </div>
  </DndContext>
);

const GlitchOwtKanban = () => {
  const statuses: Status[] = [
    { id: "ideas", name: "Ideas", color: "#6B7280" },
    { id: "building", name: "Building", color: "#F59E0B" },
    { id: "live", name: "Live", color: "#10B981" },
  ];

  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "1",
      name: "Qippy",
      description: "Voice-first AI that handles Gmail, ChatGPT & WhatsApp. Only alerts when truly needed.",
      status: statuses[2],
      icon: <Mic className="w-4 h-4" />,
      priority: "high"
    },
    {
      id: "2", 
      name: "GlitchOne",
      description: "Your voice concierge for mobility. Book rides, handle logistics, run errands - all hands-free.",
      status: statuses[1],
      icon: <Car className="w-4 h-4" />,
      priority: "high"
    },
    {
      id: "3",
      name: "Rakshak", 
      description: "Empathetic safety companion for women. Voice-powered distress detection and response.",
      status: statuses[1],
      icon: <Shield className="w-4 h-4" />,
      priority: "high"
    },
    {
      id: "4",
      name: "Zenith",
      description: "Pre-therapy voice companion. Build mindful habits through natural conversation.",
      status: statuses[0],
      icon: <Brain className="w-4 h-4" />,
      priority: "medium"
    },
    {
      id: "5",
      name: "Voice-First Calendar",
      description: "Schedule meetings, set reminders, manage your day - all through natural speech.",
      status: statuses[0],
      icon: <Plus className="w-4 h-4" />,
      priority: "medium"
    },
    {
      id: "6",
      name: "Smart Home Voice Hub",
      description: "Control your entire smart home ecosystem through conversational AI.",
      status: statuses[0],
      icon: <Lightbulb className="w-4 h-4" />,
      priority: "low"
    },
    {
      id: "7",
      name: "Voice Commerce Assistant",
      description: "Shop, compare prices, and make purchases using only your voice.",
      status: statuses[0],
      icon: <Zap className="w-4 h-4" />,
      priority: "low"
    },
    {
      id: "8",
      name: "Community Voice Network",
      description: "Connect with like-minded people building voice-first lifestyles.",
      status: statuses[0],
      icon: <Users className="w-4 h-4" />,
      priority: "medium"
    }
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const newStatus = statuses.find((status) => status.id === over.id);

    if (!newStatus) {
      return;
    }

    setFeatures(
      features.map((feature) => {
        if (feature.id === active.id) {
          return { ...feature, status: newStatus };
        }
        return feature;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto py-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            GlitchOwt Roadmap
          </h1>
          <p className="text-xl text-muted-foreground">
            Building the voice-first future. No screens. Just conversations.
          </p>
        </motion.div>

        <KanbanProvider onDragEnd={handleDragEnd} className="min-h-[600px]">
          {statuses.map((status, index) => {
            const statusFeatures = features.filter((feature) => feature.status.id === status.id);
            
            return (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <KanbanBoard id={status.id}>
                  <KanbanHeader 
                    name={status.name} 
                    color={status.color} 
                    count={statusFeatures.length}
                  />
                  <KanbanCards>
                    {statusFeatures.map((feature, featureIndex) => (
                      <KanbanCard
                        key={feature.id}
                        id={feature.id}
                        name={feature.name}
                        parent={status.id}
                        index={featureIndex}
                        description={feature.description}
                        icon={feature.icon}
                        priority={feature.priority}
                      />
                    ))}
                  </KanbanCards>
                </KanbanBoard>
              </motion.div>
            );
          })}
        </KanbanProvider>

        <motion.div 
          className="text-center mt-8 p-6 bg-muted/30 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Have an idea for a voice-first app?
          </h3>
          <p className="text-muted-foreground">
            We're always looking for new ways to help people glitch out of screen addiction.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GlitchOwtKanban;