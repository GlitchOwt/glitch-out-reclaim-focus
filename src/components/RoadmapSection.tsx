'use client';

import { Card } from '@/components/ui/card';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Mic, Shield, Brain, Car, Plus, Lightbulb, Zap, Users, GitBranch, LayoutTemplate, Smartphone, Plug } from 'lucide-react';
import { useRoadmapFeatures, type DatabaseFeature } from "@/hooks/useRoadmapFeatures";
import { SparklesCore } from "@/components/ui/sparkles";

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
  return (
    <div
      className={cn(
        'flex h-full min-h-96 flex-col gap-3 rounded-lg border-2 bg-background/50 p-4 shadow-sm transition-all duration-200',
        'border-border',
        className
      )}
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
          'rounded-lg p-4 shadow-sm border-l-4 transition-all duration-200',
          priority && priorityColors[priority],
          className
        )}
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
  className?: string;
};

export const KanbanProvider = ({
  children,
  className,
}: KanbanProviderProps) => (
  <div
    className={cn('grid w-full auto-cols-fr grid-flow-col gap-6 p-6', className)}
  >
    {children}
  </div>
);

const getIconComponent = (iconValue: string) => {
  const iconMap: Record<string, ReactNode> = {
    mic: <Mic className="w-4 h-4" />,
    shield: <Shield className="w-4 h-4" />,
    brain: <Brain className="w-4 h-4" />,
    car: <Car className="w-4 h-4" />,
    lightbulb: <Lightbulb className="w-4 h-4" />,
    zap: <Zap className="w-4 h-4" />,
    users: <Users className="w-4 h-4" />,
    plus: <Plus className="w-4 h-4" />,
    "git-branch": <GitBranch className="w-4 h-4" />,
    "layout-template": <LayoutTemplate className="w-4 h-4" />,
    smartphone: <Smartphone className="w-4 h-4" />,
    plug: <Plug className="w-4 h-4" />,
  };
  return iconMap[iconValue] || <Plus className="w-4 h-4" />;
};

const convertDatabaseFeatureToFeature = (dbFeature: DatabaseFeature, statuses: Status[]): Feature => {
  const status = statuses.find(s => s.id === dbFeature.status) || statuses[0];
  return {
    id: dbFeature.id,
    name: dbFeature.name,
    description: dbFeature.description || undefined,
    status,
    icon: getIconComponent(dbFeature.icon),
    priority: dbFeature.priority as 'high' | 'medium' | 'low',
  };
};

const GlitchOwtKanban = () => {
  const { features: dbFeatures, loading } = useRoadmapFeatures();
  
  const statuses: Status[] = [
    { id: "planned", name: "Planned", color: "#6B7280" },
    { id: "in-progress", name: "In Progress", color: "#F59E0B" },
    { id: "done", name: "Done", color: "#10B981" },
  ];

  const features = dbFeatures.map(dbFeature => convertDatabaseFeatureToFeature(dbFeature, statuses));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-muted-foreground">Loading roadmap...</div>
      </div>
    );
  }

  return (
    <div id="roadmap" className="relative min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#e9e7e1] to-[#FAF9F6]">
      {/* Sparkles background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" aria-hidden="true">
        <SparklesCore
          id="roadmap-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#2d5a2d"
          speed={0.5}
        />
      </div>
      <div className="container mx-auto py-8 relative z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-pixel text-2xl md:text-5xl text-foreground hover-glitch">
            <span className="glitch" data-text="The Glitchboard">The Glitchboard</span>
          </span>
          <p className="text-xl text-muted-foreground">
            Building the voice-first future. No screens. Just conversations.
          </p>
        </motion.div>

        <KanbanProvider className="min-h-[600px]">
          {statuses.map((status, index) => {
            const statusFeatures = features.filter((feature) => feature.status.id === status.id);
            
            return (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <KanbanBoard id={status.id} className="bg-white/60 backdrop-blur-[6px] border border-[#e9e7e1] shadow-2xl shadow-[#14473B]/30 rounded-none">
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
                        className="bg-white/80 backdrop-blur-[6px] border border-[#e9e7e1] shadow-lg rounded-none"
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