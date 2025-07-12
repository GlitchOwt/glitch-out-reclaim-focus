import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type InstagramReel = {
  id: string;
  title: string;
  instagram_url: string;
  embed_code?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type NewInstagramReel = {
  title: string;
  instagram_url: string;
  embed_code?: string;
  is_featured?: boolean;
  display_order?: number;
};

export const useInstagramReels = () => {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReels = async () => {
    try {
      const { data, error } = await supabase
        .from("instagram_reels")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReels(data || []);
    } catch (error) {
      console.error("Error fetching Instagram reels:", error);
      toast({
        title: "Error",
        description: "Failed to fetch Instagram reels",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addReel = async (newReel: NewInstagramReel) => {
    try {
      const { data, error } = await supabase
        .from("instagram_reels")
        .insert([newReel])
        .select()
        .single();

      if (error) throw error;

      setReels(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Instagram reel added successfully",
      });
      return data;
    } catch (error) {
      console.error("Error adding Instagram reel:", error);
      toast({
        title: "Error",
        description: "Failed to add Instagram reel",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateReel = async (id: string, updates: Partial<NewInstagramReel>) => {
    try {
      const { data, error } = await supabase
        .from("instagram_reels")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setReels(prev => prev.map(reel => reel.id === id ? data : reel));
      toast({
        title: "Success",
        description: "Instagram reel updated successfully",
      });
      return data;
    } catch (error) {
      console.error("Error updating Instagram reel:", error);
      toast({
        title: "Error",
        description: "Failed to update Instagram reel",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteReel = async (id: string) => {
    try {
      const { error } = await supabase
        .from("instagram_reels")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setReels(prev => prev.filter(reel => reel.id !== id));
      toast({
        title: "Success",
        description: "Instagram reel deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting Instagram reel:", error);
      toast({
        title: "Error",
        description: "Failed to delete Instagram reel",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return {
    reels,
    loading,
    addReel,
    updateReel,
    deleteReel,
    refetch: fetchReels,
  };
};