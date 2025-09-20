import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import Navigation from "../components/Navigation";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  TrendingDown,
  RefreshCw,
  ArrowRight,
  BookOpen
} from "lucide-react";

const Resilience = () => {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [showPlan, setShowPlan] = useState(false);

  const scenarios = [
    {
      id: "tech-recession",
      title: "Technology Industry Downturn",
      description: "Mass layoffs in tech sector, reduced hiring, economic uncertainty",
      impact: "High",
      probability: "Medium"
    },
    {
      id: "ai-automation",
      title: "AI Automation Impact", 
      description: "Your current role becomes automated by AI and machine learning",
      impact: "High",
      probability: "Medium"
    },
    {
      id: "industry-disruption",
      title: "Industry Disruption",
      description: "Your entire industry faces disruption from new technologies or business models",
      impact: "Very High", 
      probability: "Low"
    },
    {
      id: "skill-obsolescence",
      title: "Skill Obsolescence",
      description: "Your primary skills become outdated due to technological advancement",
      impact: "Medium",
      probability: "High"
    },
    {
      id: "personal-circumstances",
      title: "Personal Life Changes",
      description: "Family obligations, health issues, or location changes affect career",
      impact: "Medium",
      probability: "Medium"
    }
  ];

  const resiliencePlans = {
    "tech-recession": {
      planB: {
        title: "Adjacent Industry Pivot",
        description: "Transition tech skills to healthcare, finance, or government sectors",
        timeline: "6-12 months",
        steps: [
          "Identify transferable skills in your tech background",
          "Research growing sectors that need tech expertise",
          "Network with professionals in healthcare/fintech",
          "Pursue industry-specific certifications",
          "Start with contract/consulting work to build credibility"
        ],
        resources: ["Industry reports", "Networking events", "Online courses", "Professional associations"]
      },
      planC: {
        title: "Entrepreneurship/Consulting",
        description: "Leverage expertise to start own business or consulting practice",
        timeline: "3-6 months",
        steps: [
          "Assess market demand for your tech expertise",
          "Build personal brand and thought leadership",
          "Create service offerings and pricing strategy",
          "Establish legal structure and business systems",
          "Launch with existing network as initial clients"
        ],
        resources: ["Business mentorship", "Legal guidance", "Marketing platforms", "Financial planning"]
      }
    },
    "ai-automation": {
      planB: {
        title: "Human-Centric Skill Development",
        description: "Focus on skills that complement AI: creativity, emotional intelligence, complex problem-solving",
        timeline: "12-18 months",
        steps: [
          "Assess which aspects of your role are automation-resistant",
          "Develop skills in AI collaboration and management",
          "Focus on creative and strategic thinking capabilities",
          "Build expertise in human-AI interaction design",
          "Position yourself as an AI integration specialist"
        ],
        resources: ["AI literacy courses", "Creative workshops", "Leadership training", "Strategy programs"]
      },
      planC: {
        title: "New Technology Mastery",
        description: "Become an expert in the very technologies disrupting your field",
        timeline: "8-15 months",
        steps: [
          "Deep dive into AI/ML fundamentals",
          "Specialize in AI implementation and optimization",
          "Build portfolio of AI-enhanced projects",
          "Obtain relevant technical certifications",
          "Transition to AI specialist or engineer role"
        ],
        resources: ["Technical bootcamps", "AI certification programs", "Project portfolios", "Tech communities"]
      }
    }
  };

  const generatePlan = () => {
    setShowPlan(true);
  };

  const getCurrentPlan = () => {
    return resiliencePlans[selectedScenario as keyof typeof resiliencePlans];
  };

  const plan = getCurrentPlan();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Very High": return "text-destructive";
      case "High": return "text-warning";
      case "Medium": return "text-secondary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-professional pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Shield className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary text-sm font-medium">Interactive Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Career Resilience
            <span className="text-gradient"> Planning</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build robust backup plans for any career scenario. Explore strategic alternatives and create 
            comprehensive resilience strategies to navigate uncertainty with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Scenario Selection */}
          <Card className="card-professional p-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Career Risk Scenarios</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Select a potential career disruption scenario to explore strategic backup plans and resilience strategies.
            </p>

            <RadioGroup value={selectedScenario} onValueChange={setSelectedScenario}>
              <div className="space-y-4">
                {scenarios.map(scenario => (
                  <div key={scenario.id} className="card-professional p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={scenario.id} id={scenario.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={scenario.id} className="cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-foreground">{scenario.title}</h3>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(scenario.impact)} bg-current bg-opacity-10`}>
                                {scenario.impact} Impact
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{scenario.description}</p>
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <Button 
              onClick={generatePlan}
              className="w-full mt-8 btn-hero"
              disabled={!selectedScenario}
            >
              <Shield className="w-5 h-5 mr-2" />
              Create Resilience Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Sample Selection */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                Try this scenario:
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedScenario("ai-automation");
                  setShowPlan(false);
                }}
                className="text-sm text-primary hover:text-primary-dark underline"
              >
                AI Automation Impact →
              </button>
            </div>
          </Card>

          {/* Resilience Plan */}
          <div className="space-y-6">
            {showPlan && plan ? (
              <>
                {/* Plan B */}
                <Card className="card-professional p-6">
                  <div className="flex items-center mb-4">
                    <RefreshCw className="w-6 h-6 text-secondary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Plan B: {plan.planB.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{plan.planB.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-foreground">Timeline: </span>
                    <span className="text-sm text-secondary font-semibold">{plan.planB.timeline}</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Action Steps</h4>
                    <div className="space-y-2">
                      {plan.planB.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Required Resources</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.planB.resources.map((resource, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Plan C */}
                <Card className="card-professional p-6">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="w-6 h-6 text-warning mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Plan C: {plan.planC.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{plan.planC.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-foreground">Timeline: </span>
                    <span className="text-sm text-warning font-semibold">{plan.planC.timeline}</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Action Steps</h4>
                    <div className="space-y-2">
                      {plan.planC.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center text-warning-foreground font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Required Resources</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.planC.resources.map((resource, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-warning/10 text-warning text-sm rounded-full"
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Implementation Strategy */}
                <Card className="card-professional p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-success mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Implementation Strategy</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Immediate Actions (0-3 months)</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Assess current skills and market position</li>
                        <li>• Begin networking in target areas</li>
                        <li>• Start building emergency fund (6-12 months expenses)</li>
                        <li>• Update LinkedIn and professional profiles</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-secondary/10 rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Medium-term Preparation (3-12 months)</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Complete relevant certifications or training</li>
                        <li>• Build portfolio of transferable projects</li>
                        <li>• Establish connections in backup industries</li>
                        <li>• Test Plan B through side projects or consulting</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-success/10 rounded-lg">
                      <h4 className="font-semibold text-success mb-2">Long-term Resilience (12+ months)</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Maintain multiple income streams</li>
                        <li>• Continuously update skills and knowledge</li>
                        <li>• Regular career plan reviews and updates</li>
                        <li>• Build strong professional network across industries</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Resources & Tools */}
                <Card className="card-professional p-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Additional Resources</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-1">Career Coaching</h4>
                      <p className="text-sm text-muted-foreground">Professional guidance for transition planning</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-1">Financial Planning</h4>
                      <p className="text-sm text-muted-foreground">Emergency funds and income diversification</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-1">Skill Assessment</h4>
                      <p className="text-sm text-muted-foreground">Regular evaluation of market-relevant abilities</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-1">Network Building</h4>
                      <p className="text-sm text-muted-foreground">Professional connections across industries</p>
                    </div>
                  </div>
                </Card>

                <Button variant="outline" className="w-full" onClick={() => setShowPlan(false)}>
                  Explore Different Scenarios
                </Button>
              </>
            ) : (
              <Card className="card-professional p-8 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Ready to Build Resilience?
                </h3>
                <p className="text-muted-foreground">
                  Select a career risk scenario to explore comprehensive backup strategies 
                  and build confidence in navigating professional uncertainty.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resilience;