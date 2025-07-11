import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type DatabaseFeature = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  icon: string;
  priority: string;
  created_at: string;
  updated_at: string;
};

export const useRoadmapFeatures = () => {
  const [features, setFeatures] = useState<DatabaseFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('roadmap_features')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeatures(data || []);
    } catch (error) {
      console.error('Error fetching features:', error);
      toast({
        title: "Error",
        description: "Failed to load roadmap features",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addFeature = async (feature: Omit<DatabaseFeature, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('roadmap_features')
        .insert(feature)
        .select()
        .single();

      if (error) throw error;
      setFeatures(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Feature added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding feature:', error);
      toast({
        title: "Error",
        description: "Failed to add feature",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateFeature = async (id: string, updates: Partial<DatabaseFeature>) => {
    try {
      const { data, error } = await supabase
        .from('roadmap_features')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFeatures(prev => prev.map(f => f.id === id ? data : f));
      toast({
        title: "Success",
        description: "Feature updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating feature:', error);
      toast({
        title: "Error",
        description: "Failed to update feature",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteFeature = async (id: string) => {
    try {
      const { error } = await supabase
        .from('roadmap_features')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFeatures(prev => prev.filter(f => f.id !== id));
      toast({
        title: "Success",
        description: "Feature deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting feature:', error);
      toast({
        title: "Error",
        description: "Failed to delete feature",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateFeatureStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('roadmap_features')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFeatures(prev => prev.map(f => f.id === id ? data : f));
      return data;
    } catch (error) {
      console.error('Error updating feature status:', error);
      toast({
        title: "Error",
        description: "Failed to update feature status",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return {
    features,
    loading,
    addFeature,
    updateFeature,
    deleteFeature,
    updateFeatureStatus,
    refetch: fetchFeatures,
  };
};