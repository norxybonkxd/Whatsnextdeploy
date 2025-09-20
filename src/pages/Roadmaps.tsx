import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import Navigation from "../components/Navigation";
import { 
  Network, 
  ArrowRight, 
  CheckCircle, 
  Circle, 
  Diamond,
  MapPin,
  Clock,
  Users,
  BookOpen
} from "lucide-react";

interface FlowchartOption {
  id: string;
  label: string;
  next: string;
}

interface FlowchartDetails {
  timeline: string;
  keySkills: string[];
  milestones: string[];
  nextSteps?: string[];
}

interface DecisionNode {
  title: string;
  description: string;
  type: "decision";
  options: FlowchartOption[];
}

interface MilestoneNode {
  title: string;
  description: string;
  type: "milestone";
  details: FlowchartDetails;
}

type FlowchartNode = DecisionNode | MilestoneNode;

const Roadmaps = () => {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState("start");

  const flowchartData: Record<string, FlowchartNode> = {
    start: {
      title: "Career Starting Point",
      description: "Choose your current professional level",
      type: "decision",
      options: [
        { id: "entry", label: "Entry Level (0-2 years)", next: "entry-focus" },
        { id: "mid", label: "Mid Level (3-5 years)", next: "mid-focus" },
        { id: "senior", label: "Senior Level (5+ years)", next: "senior-focus" }
      ]
    },
    "entry-focus": {
      title: "Entry Level Focus Area",
      description: "What's your primary career interest?",
      type: "decision",
      options: [
        { id: "technical", label: "Technical Skills", next: "entry-technical" },
        { id: "business", label: "Business Skills", next: "entry-business" },
        { id: "creative", label: "Creative Skills", next: "entry-creative" }
      ]
    },
    "entry-technical": {
      title: "Technical Career Path",
      description: "Build foundational technical expertise",
      type: "milestone",
      details: {
        timeline: "18-24 months",
        keySkills: ["Programming", "Data Analysis", "System Design", "Problem Solving"],
        milestones: [
          "Complete coding bootcamp or CS fundamentals",
          "Build 3-5 portfolio projects",
          "Land first technical role",
          "Contribute to open source projects"
        ],
        nextSteps: ["technical-specialization", "technical-leadership"]
      }
    },
    "entry-business": {
      title: "Business Career Path", 
      description: "Develop business acumen and strategic thinking",
      type: "milestone",
      details: {
        timeline: "12-18 months",
        keySkills: ["Analysis", "Communication", "Strategy", "Project Management"],
        milestones: [
          "Master business fundamentals",
          "Complete MBA or business certification",
          "Lead cross-functional project",
          "Develop industry expertise"
        ],
        nextSteps: ["business-management", "business-strategy"]
      }
    },
    "technical-specialization": {
      title: "Technical Specialization",
      description: "Choose your technical specialty area",
      type: "decision",
      options: [
        { id: "ai-ml", label: "AI & Machine Learning", next: "ai-expert" },
        { id: "cloud", label: "Cloud Architecture", next: "cloud-expert" },
        { id: "security", label: "Cybersecurity", next: "security-expert" }
      ]
    },
    "ai-expert": {
      title: "AI/ML Specialist",
      description: "Become an AI and Machine Learning expert",
      type: "milestone",
      details: {
        timeline: "24-36 months",
        keySkills: ["Deep Learning", "Neural Networks", "MLOps", "Research"],
        milestones: [
          "Master advanced ML algorithms",
          "Publish research or blog posts", 
          "Lead ML projects at scale",
          "Become recognized AI thought leader"
        ],
        nextSteps: ["ai-research", "ai-leadership"]
      }
    }
  };

  const handlePathSelection = (optionId: string, nextStep: string) => {
    setSelectedPath([...selectedPath, optionId]);
    setCurrentStep(nextStep);
  };

  const resetFlowchart = () => {
    setSelectedPath([]);
    setCurrentStep("start");
  };

  const goBack = () => {
    if (selectedPath.length > 0) {
      const newPath = [...selectedPath];
      newPath.pop();
      setSelectedPath(newPath);
      
      // Determine previous step based on path
      if (newPath.length === 0) {
        setCurrentStep("start");
      } else {
        // This is simplified - in a real app you'd track the full navigation history
        const prevStep = newPath[newPath.length - 1];
        if (prevStep === "entry") setCurrentStep("entry-focus");
        else if (prevStep === "technical") setCurrentStep("entry-technical");
        // Add more navigation logic as needed
      }
    }
  };

  const currentNode = flowchartData[currentStep as keyof typeof flowchartData];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-professional pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Network className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary text-sm font-medium">Interactive Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Interactive Flowchart
            <span className="text-gradient"> Roadmaps</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate dynamic career flowcharts that adapt to your choices. Explore different routes, 
            see decision impacts, and discover personalized pathways to your professional goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Panel */}
          <Card className="card-professional p-6">
            <div className="flex items-center mb-6">
              <MapPin className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-bold text-foreground">Your Journey</h3>
            </div>
            
            {/* Path Breadcrumbs */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm">
                <Circle className="w-4 h-4 text-primary mr-2" />
                <span className="text-foreground font-medium">Starting Point</span>
              </div>
              
              {selectedPath.map((step, index) => (
                <div key={index} className="flex items-center text-sm ml-6">
                  <ArrowRight className="w-3 h-3 text-muted-foreground mr-2" />
                  <CheckCircle className="w-4 h-4 text-success mr-2" />
                  <span className="text-muted-foreground capitalize">{step.replace("-", " ")}</span>
                </div>
              ))}
              
              {currentStep !== "start" && (
                <div className="flex items-center text-sm ml-6">
                  <ArrowRight className="w-3 h-3 text-muted-foreground mr-2" />
                  <Diamond className="w-4 h-4 text-primary mr-2" />
                  <span className="text-primary font-medium">Current Step</span>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="space-y-3">
              {selectedPath.length > 0 && (
                <Button variant="outline" onClick={goBack} className="w-full">
                  ← Go Back
                </Button>
              )}
              <Button variant="outline" onClick={resetFlowchart} className="w-full">
                🔄 Start Over
              </Button>
            </div>

            {/* Progress Stats */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Progress</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Steps Completed:</span>
                  <span className="font-medium text-foreground">{selectedPath.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decisions Made:</span>
                  <span className="font-medium text-foreground">{selectedPath.length}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Flowchart Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Node */}
            <Card className="card-professional p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  {currentNode?.type === "decision" ? (
                    <Diamond className="w-8 h-8 text-primary-foreground" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-primary-foreground" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  {currentNode?.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {currentNode?.description}
                </p>
              </div>

              {/* Decision Options */}
              {currentNode?.type === "decision" && "options" in currentNode && (
                <div className="grid grid-cols-1 gap-4">
                  {currentNode.options.map((option, index) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      size="lg"
                      onClick={() => handlePathSelection(option.id, option.next)}
                      className="justify-between p-6 h-auto text-left hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <span className="font-medium">{option.label}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              )}

              {/* Milestone Details */}
              {currentNode?.type === "milestone" && "details" in currentNode && currentNode.details && (
                <div className="space-y-6">
                  {/* Timeline */}
                  <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary mr-3" />
                    <span className="text-primary font-semibold">
                      Estimated Timeline: {currentNode.details.timeline}
                    </span>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Key Skills to Develop
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentNode.details.keySkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Key Milestones
                    </h4>
                    <div className="space-y-3">
                      {currentNode.details.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-success-foreground font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground">{milestone}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  {currentNode.details.nextSteps && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Continue Your Journey</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {currentNode.details.nextSteps.map((nextStep, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setCurrentStep(nextStep)}
                            className="justify-between"
                          >
                            <span className="capitalize">{nextStep.replace("-", " ")}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Interactive Tips */}
            <Card className="card-professional p-6">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-primary mr-2" />
                <h3 className="text-lg font-bold text-foreground">Interactive Tips</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">💡 Click to Explore</h4>
                  <p className="text-muted-foreground">Each choice opens new career possibilities</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">📊 Track Progress</h4>
                  <p className="text-muted-foreground">See your decisions in the left panel</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">🔄 Experiment</h4>
                  <p className="text-muted-foreground">Go back and try different paths</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">🎯 Personalized</h4>
                  <p className="text-muted-foreground">Paths adapt to your selections</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;