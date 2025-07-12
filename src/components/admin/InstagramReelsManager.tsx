import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Edit, Instagram, Star, Sparkles } from "lucide-react";
import { useInstagramReels, type NewInstagramReel } from "@/hooks/useInstagramReels";
import { generateInstagramEmbedCode, isValidInstagramReelUrl } from "@/lib/utils";

const InstagramReelsManager = () => {
  const { reels, loading, addReel, updateReel, deleteReel } = useInstagramReels();
  const [newReel, setNewReel] = useState<NewInstagramReel>({
    title: "",
    instagram_url: "",
    embed_code: "",
    is_featured: false,
    display_order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleGenerateEmbedCode = () => {
    if (newReel.instagram_url && isValidInstagramReelUrl(newReel.instagram_url)) {
      try {
        const embedCode = generateInstagramEmbedCode(newReel.instagram_url);
        setNewReel(prev => ({ ...prev, embed_code: embedCode }));
      } catch (error) {
        console.error("Error generating embed code:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Auto-generate embed code if not provided and URL is valid
      let finalReel = { ...newReel };
      if (!finalReel.embed_code && finalReel.instagram_url && isValidInstagramReelUrl(finalReel.instagram_url)) {
        try {
          finalReel.embed_code = generateInstagramEmbedCode(finalReel.instagram_url);
        } catch (error) {
          console.error("Error auto-generating embed code:", error);
        }
      }

      if (editingId) {
        await updateReel(editingId, finalReel);
        setEditingId(null);
      } else {
        await addReel(finalReel);
      }
      setNewReel({
        title: "",
        instagram_url: "",
        embed_code: "",
        is_featured: false,
        display_order: 0,
      });
    } catch (error) {
      console.error("Error saving Instagram reel:", error);
    }
  };

  const handleEdit = (reel: any) => {
    setNewReel({
      title: reel.title,
      instagram_url: reel.instagram_url,
      embed_code: reel.embed_code || "",
      is_featured: reel.is_featured,
      display_order: reel.display_order,
    });
    setEditingId(reel.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewReel({
      title: "",
      instagram_url: "",
      embed_code: "",
      is_featured: false,
      display_order: 0,
    });
  };

  if (loading) {
    return <div className="text-center">Loading Instagram reels...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 border border-[#e9e7e1] shadow-lg rounded-none backdrop-blur-[6px]">
        <CardHeader>
          <CardTitle className="text-xl text-[#2d5a2d] flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            {editingId ? "Edit Instagram Reel" : "Add New Instagram Reel"}
          </CardTitle>
          <CardDescription>
            Add Instagram reel URLs to display in the social wall carousel. 
            <br />
            <strong>To embed reels directly:</strong> Go to the Instagram reel → Click "..." → Select "Embed" → Copy the embed code and paste it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newReel.title}
                  onChange={(e) => setNewReel(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter reel title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  value={newReel.instagram_url}
                  onChange={(e) => setNewReel(prev => ({ ...prev, instagram_url: e.target.value }))}
                  placeholder="https://www.instagram.com/reel/..."
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="embed_code">Embed Code (Optional)</Label>
                {newReel.instagram_url && isValidInstagramReelUrl(newReel.instagram_url) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateEmbedCode}
                    className="flex items-center gap-1"
                  >
                    <Sparkles className="h-3 w-3" />
                    Auto-generate
                  </Button>
                )}
              </div>
              <Textarea
                id="embed_code"
                value={newReel.embed_code}
                onChange={(e) => setNewReel(prev => ({ ...prev, embed_code: e.target.value }))}
                placeholder="Paste Instagram embed code here or use auto-generate button"
                rows={3}
              />
              {newReel.instagram_url && !isValidInstagramReelUrl(newReel.instagram_url) && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter a valid Instagram reel URL to auto-generate embed code
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={newReel.is_featured}
                  onCheckedChange={(checked) => setNewReel(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={newReel.display_order}
                  onChange={(e) => setNewReel(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                {editingId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingId ? "Update Reel" : "Add Reel"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold text-[#2d5a2d]">Existing Instagram Reels ({reels.length})</h3>
        {reels.length === 0 ? (
          <Card className="bg-white/60 border border-[#e9e7e1] shadow-lg rounded-none backdrop-blur-[6px]">
            <CardContent className="text-center py-8">
              <Instagram className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No Instagram reels added yet.</p>
            </CardContent>
          </Card>
        ) : (
          reels.map((reel) => (
            <Card key={reel.id} className="bg-white/60 border border-[#e9e7e1] shadow-lg rounded-none backdrop-blur-[6px]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-[#2d5a2d]">{reel.title}</h4>
                      {reel.is_featured && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline">Order: {reel.display_order}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{reel.instagram_url}</p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(reel.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(reel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteReel(reel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default InstagramReelsManager;