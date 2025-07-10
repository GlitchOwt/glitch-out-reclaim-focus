import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Car, Shield, Brain } from "lucide-react";

const AppsSection = () => {
  const apps = [
    {
      name: "Qippy",
      description: "Handles Gmail, ChatGPT, and WhatsApp. Alerts you only when needed. Think of it as your digital butler who knows when to interrupt.",
      icon: Mic,
      status: "Building",
      features: ["Smart filtering", "Voice summaries", "Priority alerts"],
      color: "text-blue-600"
    },
    {
      name: "GlitchOne",
      description: "Concierge mobility via voice. Logistics, rides, errands—all handled through natural conversation. Uber, but you never touch your phone.",
      icon: Car,
      status: "Ideas",
      features: ["Voice booking", "Real-time updates", "Smart routing"],
      color: "text-green-600"
    },
    {
      name: "Rakshak",
      description: "Empathetic safety net for women in distress, powered by voice. Always listening, never judging. Because safety shouldn't require fumbling with apps.",
      icon: Shield,
      status: "Building",
      features: ["Always-on protection", "Voice activation", "Smart alerts"],
      color: "text-red-600"
    },
    {
      name: "Zenith",
      description: "Pre-therapy voice companion building mindful habits. Like having a thoughtful friend who helps you process emotions before they become overwhelming.",
      icon: Brain,
      status: "Live",
      features: ["Mood tracking", "Voice journaling", "Mindful check-ins"],
      color: "text-purple-600"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return "bg-green-100 text-green-800";
      case "Building": return "bg-blue-100 text-blue-800";
      case "Ideas": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="apps" className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Four Apps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each app replaces a category of screen-based interactions with natural, voice-first experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app, index) => {
            const IconComponent = app.icon;
            return (
              <Card key={app.name} className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-secondary ${app.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-2xl">{app.name}</CardTitle>
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Key Features:</h4>
                    <ul className="space-y-1">
                      {app.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <span className="font-pixel text-primary">VOICE {'>'} SCREENS</span> — Because your attention deserves better.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppsSection;