import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Hammer, Rocket } from "lucide-react";

const RoadmapSection = () => {
  const roadmapColumns = [
    {
      title: "Ideas",
      icon: Lightbulb,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      items: [
        {
          title: "VoiceOS",
          description: "Complete operating system replacement with voice-first interactions",
          priority: "Low",
          category: "Platform"
        },
        {
          title: "GlitchPay",
          description: "Voice-activated payments and financial management",
          priority: "Medium",
          category: "Fintech"
        },
        {
          title: "EchoDesk",
          description: "Voice-first customer support automation",
          priority: "Low",
          category: "Business"
        }
      ]
    },
    {
      title: "Building",
      icon: Hammer,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        {
          title: "Qippy v2",
          description: "Advanced email management with smart voice summaries",
          priority: "High",
          category: "Productivity"
        },
        {
          title: "Rakshak Beta",
          description: "Safety companion with always-on voice activation",
          priority: "High",
          category: "Safety"
        },
        {
          title: "Voice SDK",
          description: "Developer tools for building voice-first applications",
          priority: "Medium",
          category: "Platform"
        }
      ]
    },
    {
      title: "Live",
      icon: Rocket,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        {
          title: "Zenith v1",
          description: "Pre-therapy voice companion for mindful habits",
          priority: "High",
          category: "Wellness"
        },
        {
          title: "GlitchOwt Website",
          description: "Studio homepage and brand presence",
          priority: "Medium",
          category: "Brand"
        },
        {
          title: "Voice Manifesto",
          description: "Public declaration of voice-first philosophy",
          priority: "Medium",
          category: "Content"
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="roadmap" className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building in public. Here's what we're dreaming, developing, and delivering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roadmapColumns.map((column) => {
            const IconComponent = column.icon;
            return (
              <div key={column.title} className="space-y-4">
                {/* Column Header */}
                <div className={`${column.bgColor} rounded-lg p-4 border-2 border-dashed border-current`}>
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-6 h-6 ${column.color}`} />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {column.title}
                    </h3>
                    <Badge variant="secondary" className="ml-auto">
                      {column.items.length}
                    </Badge>
                  </div>
                </div>

                {/* Column Items */}
                <div className="space-y-4">
                  {column.items.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-serif">{item.title}</CardTitle>
                          <Badge className={getPriorityColor(item.priority)} variant="secondary">
                            {item.priority}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="w-fit text-xs">
                          {item.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <span className="font-pixel text-primary">BUILDING → SHIPPING → ITERATING</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Got an idea for the roadmap? Suggest it below.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;