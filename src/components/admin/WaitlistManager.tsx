import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, Trash2, Mail, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

const WaitlistManager = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<WaitlistEntry[]>([]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: "Error",
        description: "Failed to load subscribers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    const filtered = entries.filter(entry =>
      entry.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(filtered);
  }, [entries, searchTerm]);

  const handleDeleteEntry = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', entryId);

      if (error) throw error;
      
      setEntries(entries.filter(entry => entry.id !== entryId));
      toast({
        title: "Subscriber deleted",
        description: "The subscriber has been removed.",
      });
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to delete subscriber",
        variant: "destructive",
      });
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = [
      ['Email', 'Joined Date'],
      ...filteredEntries.map(entry => [
        entry.email,
        new Date(entry.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `glitchowt-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "CSV downloaded",
      description: "The subscriber list has been exported successfully.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate stats
  const totalEntries = entries.length;
  const todayEntries = entries.filter(entry => {
    const entryDate = new Date(entry.created_at);
    const today = new Date();
    return entryDate.toDateString() === today.toDateString();
  }).length;
  const thisWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return entryDate >= oneWeekAgo;
  }).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8 text-muted-foreground">
          Loading subscribers...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-green" />
              <div>
                <p className="text-sm text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold text-foreground">{totalEntries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-green" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">{thisWeekEntries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-green" />
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-foreground">{todayEntries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-green" />
              Newsletter Subscribers ({filteredEntries.length})
            </CardTitle>
            <Button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-2"
              disabled={filteredEntries.length === 0}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "No subscribers match your search" : "No newsletter subscribers yet"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map(entry => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.email}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(entry.created_at)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {filteredEntries.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Showing {filteredEntries.length} of {entries.length} subscribers
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistManager;