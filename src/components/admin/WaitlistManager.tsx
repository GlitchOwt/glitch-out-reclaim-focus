import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, Trash2, Mail, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistEntry {
  id: string;
  email: string;
  joinedAt: string;
  source: string;
}

const WaitlistManager = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<WaitlistEntry[]>([
    {
      id: "1",
      email: "john@example.com",
      joinedAt: new Date().toISOString(),
      source: "Newsletter Signup"
    },
    {
      id: "2", 
      email: "sarah@example.com",
      joinedAt: new Date(Date.now() - 86400000).toISOString(),
      source: "Newsletter Signup"
    },
    {
      id: "3",
      email: "mike@example.com", 
      joinedAt: new Date(Date.now() - 172800000).toISOString(),
      source: "Suggest a Glitch"
    },
    {
      id: "4",
      email: "lisa@example.com",
      joinedAt: new Date(Date.now() - 259200000).toISOString(),
      source: "Newsletter Signup"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<WaitlistEntry[]>(entries);

  useEffect(() => {
    const filtered = entries.filter(entry => 
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(filtered);
  }, [searchTerm, entries]);

  const handleDeleteEntry = (entryId: string) => {
    setEntries(entries.filter(e => e.id !== entryId));
    toast({
      title: "Entry deleted",
      description: "The waitlist entry has been removed.",
    });
  };

  const handleDownloadCSV = () => {
    const csvContent = [
      ['Email', 'Joined Date', 'Source'],
      ...filteredEntries.map(entry => [
        entry.email,
        new Date(entry.joinedAt).toLocaleDateString(),
        entry.source
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `glitchowt-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "CSV downloaded",
      description: "The waitlist has been exported successfully.",
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

  const getSourceIcon = (source: string) => {
    if (source.includes('Newsletter')) {
      return <Mail className="w-4 h-4" />;
    }
    return <Users className="w-4 h-4" />;
  };

  const stats = {
    total: entries.length,
    thisWeek: entries.filter(e => 
      new Date(e.joinedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
    newsletter: entries.filter(e => e.source.includes('Newsletter')).length,
    glitch: entries.filter(e => e.source.includes('Glitch')).length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-green" />
              <div>
                <p className="text-sm text-muted-foreground">Total Signups</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-green" />
              <div>
                <p className="text-sm text-muted-foreground">Newsletter</p>
                <p className="text-2xl font-bold text-foreground">{stats.newsletter}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-green" />
              <div>
                <p className="text-sm text-muted-foreground">Glitch Ideas</p>
                <p className="text-2xl font-bold text-foreground">{stats.glitch}</p>
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
              Waitlist Entries
            </CardTitle>
            <Button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-2"
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
              placeholder="Search by email or source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No entries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSourceIcon(entry.source)}
                          {entry.source}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(entry.joinedAt)}
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
          </div>

          {filteredEntries.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Showing {filteredEntries.length} of {entries.length} entries
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistManager;