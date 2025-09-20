import { Button } from "./ui/button";
import { ArrowRight, Play, Users, TrendingUp, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,yo
} from "@/components/ui/dialog";

const HeroSection = () => {
  const navigate = useNavigate();
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.6)' }}
      >
        <source src="/videos/career-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container-professional">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-fade-up">
            <Target className="w-4 h-4 mr-2 text-white" />
            <span className="text-white/90 text-sm font-medium">Professional Career Intelligence Platform</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-up">
            Shape Your
            <span className="block text-gradient bg-gradient-to-r from-white to-secondary-light bg-clip-text text-transparent">
              Career Future
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Experience the future of career planning with AI-powered insights, personalized roadmaps, 
            and real-time market intelligence. Transform your professional journey today.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay">
            <Button 
              size="lg" 
              className="btn-hero text-lg px-8 py-4 interactive-glow"
              onClick={() => navigate('/demo')}
            >
              <Play className="w-5 h-5 mr-2" />
              Try Interactive Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm px-8 py-4"
              onClick={() => setShowVideoDialog(true)}
            >
              Watch Overview
            </Button>
          </div>

          {/* Video Overview Dialog */}
          <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Platform Overview</DialogTitle>
                <DialogDescription>
                  Watch our quick overview of the Career Future platform
                </DialogDescription>
              </DialogHeader>
              <div className="aspect-video relative">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/mRT4aqyUV5Q?autoplay=1"
                  title="Platform Overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-delay">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white mr-2" />
                <span className="text-3xl font-bold text-white">50K+</span>
              </div>
              <p className="text-white/70">Professionals Guided</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-white mr-2" />
                <span className="text-3xl font-bold text-white">95%</span>
              </div>
              <p className="text-white/70">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-white mr-2" />
                <span className="text-3xl font-bold text-white">7</span>
              </div>
              <p className="text-white/70">Smart Features</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
