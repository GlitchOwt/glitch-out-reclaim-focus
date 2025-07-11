import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Kanban, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RoadmapManager from "@/components/admin/RoadmapManager";
import WaitlistManager from "@/components/admin/WaitlistManager";
import Header from "@/components/Header";
import ClickSpark from "@/components/ClickSpark";
import { SparklesCore } from "@/components/ui/sparkles";

const Admin = () => {
  return (
    <ClickSpark sparkColor="#2d5a2d" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="relative min-h-screen bg-[#FAF9F6] scroll-smooth">
        <div className="fixed inset-0 w-full h-full z-0" aria-hidden="true">
          <SparklesCore
            id="tsparticlesadmin"
            background="#FAF9F6"
            minSize={1.2}
            maxSize={2.2}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#2d5a2d"
          />
        </div>
        <div className="relative z-10">
          {/* Optional: Use Header for full consistency, or keep custom admin bar below */}
          {/* <Header /> */}
          <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Site
                  </Link>
                  <div className="h-6 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-brand-green" />
                    <span className="font-pixel text-4xl md:text-6xl text-[#2d5a2d] hover-glitch">
                      <span className="glitch" data-text="GlitchOwt Admin">
                        GlitchOwt Admin
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto p-6">
            <Tabs defaultValue="roadmap" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="roadmap" className="flex items-center gap-2">
                  <Kanban className="w-4 h-4" />
                  Roadmap
                </TabsTrigger>
                <TabsTrigger value="waitlist" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Waitlist
                </TabsTrigger>
              </TabsList>

              <TabsContent value="roadmap" className="space-y-6">
                <Card className="bg-white/60 border border-[#e9e7e1] shadow-2xl shadow-[#14473B]/30 rounded-none backdrop-blur-[6px] p-0">
                  <CardHeader className="text-center rounded-none p-0 pt-8 pb-4">
                    <CardTitle className="text-2xl text-[#2d5a2d] flex items-center justify-center gap-2 font-pixel">
                      <Kanban className="h-6 w-6 text-brand-green" />
                      Roadmap Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 px-8 pb-8 pt-2">
                    <RoadmapManager />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="waitlist" className="space-y-6">
                <Card className="bg-white/60 border border-[#e9e7e1] shadow-2xl shadow-[#14473B]/30 rounded-none backdrop-blur-[6px] p-0">
                  <CardHeader className="text-center rounded-none p-0 pt-8 pb-4">
                    <CardTitle className="text-2xl text-[#2d5a2d] flex items-center justify-center gap-2 font-pixel">
                      <Users className="h-6 w-6 text-brand-green" />
                      Waitlist Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 px-8 pb-8 pt-2">
                    <WaitlistManager />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
};

export default Admin;