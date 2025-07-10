import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Mic, Zap, Lightbulb } from "lucide-react";
import { useState } from "react";

const SuggestGlitchSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    title: "",
    description: "",
    useCase: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show a success message
    alert("Thanks for your suggestion! We'll review it and add it to our roadmap.");
    setFormData({
      name: "",
      email: "",
      category: "",
      title: "",
      description: "",
      useCase: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="suggest" className="section-padding bg-secondary/30">
      <div className="max-w-4xl mx-auto container-padding">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            Community Input
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Suggest a Glitch
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            What's one task you wish you could voice out and forget? Help us build the next voice-first app.
          </p>
        </div>

        <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center gap-2">
              <Mic className="w-6 h-6 text-primary" />
              Your Voice-First App Idea
            </CardTitle>
            <CardDescription>
              Think of daily frustrations that require too many taps, swipes, or visual attention. 
              What would you rather just talk to?
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="What should we call you?"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="What type of app is this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">App Name/Title</Label>
                <Input
                  id="title"
                  placeholder="What would you call this voice-first app?"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this app would do. What problem does it solve?"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Voice Interaction Example</Label>
                <Textarea
                  id="useCase"
                  placeholder="Give us an example: 'Hey [AppName], ...' How would someone use this with their voice?"
                  value={formData.useCase}
                  onChange={(e) => handleInputChange("useCase", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Submit Suggestion
                </Button>
                <Button type="button" variant="minimal" size="lg">
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Great ideas become part of our roadmap. Contributors get early access and credit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuggestGlitchSection;