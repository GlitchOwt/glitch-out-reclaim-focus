"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Send, Zap, CheckCircle, XCircle } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

const SuggestGlitchSection = () => {
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!task.trim() || !details.trim() || !email.trim()) return;
    setIsSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      // Simulate API call (replace with your real endpoint)
      const res = await fetch("/api/suggest-glitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, details, email }),
      });
      if (!res.ok) throw new Error("Failed to submit suggestion");
      setSuccess(true);
      setTask("");
      setDetails("");
      setEmail("");
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="suggest" className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#e9e7e1] to-[#FAF9F6] relative overflow-hidden font-sans">
      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        <SparklesCore
          id="suggest-glitch-particles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#2d5a2d"
          speed={0.5}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <span className="font-pixel text-4xl md:text-6xl text-[#2d5a2d] hover-glitch">
              <span className="glitch" data-text="Suggest the Glitch">
                Suggest the Glitch
              </span>
            </span>
          </div>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
            Help us improve by suggesting new voice-powered tasks or magical ideas for our masterplan.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center w-full"
        >
          <Card className="bg-white/60 border border-[#e9e7e1] shadow-2xl shadow-[#14473B]/30 w-full max-w-2xl rounded-none backdrop-blur-[6px] p-0">
            <CardHeader className="text-center rounded-none p-0 pt-8 pb-4">
              <CardTitle className="text-2xl text-[#2d5a2d] flex items-center justify-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                Share Your Voice Task Idea
              </CardTitle>
              <CardDescription className="text-neutral-700">
                What would you love to do with your voice?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8 pt-2">
              {/* Task Input */}
              <div>
                <label htmlFor="task" className="text-sm font-medium text-[#2d5a2d] mb-2 block">
                  What task would you love to voice out?
                </label>
                <input
                  id="task"
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="e.g., Book a cab, order food, schedule meetings..."
                  className="w-full px-4 py-3 bg-white/80 border border-[#e9e7e1] text-[#2d5a2d] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2d5a2d] focus:border-[#2d5a2d] transition-all duration-200 rounded-none"
                  autoComplete="off"
                  required
                />
              </div>
              {/* Details Textarea */}
              <div>
                <label htmlFor="details" className="text-sm font-medium text-[#2d5a2d] mb-2 block">
                  Tell us more about your idea
                </label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe how you envision this working with voice commands. What would make this experience magical for you?"
                  className="w-full min-h-[100px] px-4 py-3 bg-white/80 border border-[#e9e7e1] text-[#2d5a2d] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2d5a2d] focus:border-[#2d5a2d] transition-all duration-200 rounded-none"
                  required
                />
              </div>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#2d5a2d] mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-white/80 border border-[#e9e7e1] text-[#2d5a2d] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2d5a2d] focus:border-[#2d5a2d] transition-all duration-200 rounded-none"
                  autoComplete="email"
                  required
                />
              </div>
              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!task.trim() || !details.trim() || !email.trim() || isSubmitting}
                className="w-full bg-[#14473B] hover:bg-[#0f362b] text-white font-medium py-3 rounded-none transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                size="lg"
                aria-label="Submit your suggestion"
                type="button"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Zap className="h-4 w-4" />
                    </motion.div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Suggestion
                  </>
                )}
              </Button>
              {success && (
                <div className="flex items-center gap-2 mt-4 text-green-700 bg-green-50 border border-green-200 px-4 py-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Thank you! Your suggestion has been submitted.
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 mt-4 text-red-700 bg-red-50 border border-red-200 px-4 py-2 text-sm">
                  <XCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SuggestGlitchSection;