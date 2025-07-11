import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Mic, Shield, Brain, Car, Lightbulb, Zap, Users, GitBranch, LayoutTemplate, Smartphone, Plug } from "lucide-react";
import { useRoadmapFeatures, type DatabaseFeature } from "@/hooks/useRoadmapFeatures";

const iconOptions = [
  { value: "mic", label: "Mic", icon: <Mic className="w-4 h-4" /> },
  { value: "shield", label: "Shield", icon: <Shield className="w-4 h-4" /> },
  { value: "brain", label: "Brain", icon: <Brain className="w-4 h-4" /> },
  { value: "car", label: "Car", icon: <Car className="w-4 h-4" /> },
  { value: "lightbulb", label: "Lightbulb", icon: <Lightbulb className="w-4 h-4" /> },
  { value: "zap", label: "Zap", icon: <Zap className="w-4 h-4" /> },
  { value: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
  { value: "plus", label: "Plus", icon: <Plus className="w-4 h-4" /> },
  { value: "git-branch", label: "Git Branch", icon: <GitBranch className="w-4 h-4" /> },
  { value: "layout-template", label: "Template", icon: <LayoutTemplate className="w-4 h-4" /> },
  { value: "smartphone", label: "Smartphone", icon: <Smartphone className="w-4 h-4" /> },
  { value: "plug", label: "Plug", icon: <Plug className="w-4 h-4" /> },
];

const getIconComponent = (iconValue: string) => {
  const icon = iconOptions.find(opt => opt.value === iconValue);
  return icon ? icon.icon : <Plus className="w-4 h-4" />;
};

const RoadmapManager = () => {
  const { features, loading, addFeature, updateFeature, deleteFeature } = useRoadmapFeatures();
  
  const statuses = [
    { id: "planned", name: "Planned", color: "#6B7280" },
    { id: "in-progress", name: "In Progress", color: "#F59E0B" },
    { id: "done", name: "Done", color: "#10B981" },
  ];

  const [editingFeature, setEditingFeature] = useState<DatabaseFeature | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planned",
    icon: "plus",
    priority: "medium" as "high" | "medium" | "low"
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      status: "planned",
      icon: "plus",
      priority: "medium"
    });
    setEditingFeature(null);
  };

  const handleAddFeature = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditFeature = (feature: DatabaseFeature) => {
    setEditingFeature(feature);
    setFormData({
      name: feature.name,
      description: feature.description || "",
      status: feature.status,
      icon: feature.icon,
      priority: feature.priority as "high" | "medium" | "low"
    });
    setIsDialogOpen(true);
  };

  const handleDeleteFeature = async (featureId: string) => {
    await deleteFeature(featureId);
  };

  const handleSaveFeature = async () => {
    if (editingFeature) {
      await updateFeature(editingFeature.id, {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        icon: formData.icon,
        priority: formData.priority
      });
    } else {
      await addFeature({
        name: formData.name,
        description: formData.description,
        status: formData.status,
        icon: formData.icon,
        priority: formData.priority
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Manage Roadmap Features
        </h3>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddFeature} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Feature
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingFeature ? "Edit Feature" : "Add New Feature"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Feature Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter feature name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter feature description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status.id} value={status.id}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={formData.priority} onValueChange={(value: "high" | "medium" | "low") => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({...formData, icon: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            {option.icon}
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveFeature} className="w-full">
                  {editingFeature ? "Update Feature" : "Add Feature"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="text-muted-foreground">Loading features...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statuses.map(status => {
            const statusFeatures = features.filter(f => f.status === status.id);
          
          return (
            <Card key={status.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: status.color }}
                  />
                  {status.name} ({statusFeatures.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {statusFeatures.map(feature => (
                  <Card key={feature.id} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {getIconComponent(feature.icon)}
                          <h4 className="font-medium text-sm truncate">{feature.name}</h4>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditFeature(feature)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteFeature(feature.id)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {feature.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {feature.description}
                        </p>
                      )}
                      
                      <div className="flex justify-end">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          feature.priority === 'high' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            : feature.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {feature.priority}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
        </div>
      )}
    </div>
  );
};

export default RoadmapManager;