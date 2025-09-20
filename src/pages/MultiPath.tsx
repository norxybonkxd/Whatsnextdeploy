import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import Navigation from "../components/Navigation";
import { 
  GitBranch, 
  Palette, 
  Code, 
  TrendingUp, 
  Users, 
  Lightbulb,
  ArrowRight,
  Shuffle
} from "lucide-react";

const MultiPath = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showPaths, setShowPaths] = useState(false);

  const careerInterests = [
    { id: "data-science", name: "Data Science", icon: TrendingUp, description: "Analytics, ML, Statistics" },
    { id: "product-management", name: "Product Management", icon: Lightbulb, description: "Strategy, User Experience" },
    { id: "design", name: "UX/UI Design", icon: Palette, description: "Visual Design, User Research" },
    { id: "engineering", name: "Software Engineering", icon: Code, description: "Development, Architecture" },
    { id: "consulting", name: "Business Consulting", icon: Users, description: "Strategy, Operations" }
  ];

  const hybridPaths = {
    "data-science,product-management": {
      title: "Product Analytics Lead",
      overlap: 85,
      description: "Combine data insights with product strategy to drive user engagement and business growth.",
      skills: ["Product Analytics", "A/B Testing", "User Research", "Statistical Analysis", "Product Strategy"],
      companies: ["Google", "Meta", "Airbnb", "Uber"],
      timeline: "3-5 years to reach senior level",
      salary: "$140K - $220K"
    },
    "design,engineering": {
      title: "Design Engineer",
      overlap: 75,
      description: "Bridge design and development to create seamless user experiences with technical excellence.",
      skills: ["Frontend Development", "Design Systems", "Prototyping", "React/Vue", "Design Tools"],
      companies: ["Apple", "Netflix", "Spotify", "Adobe"],
      timeline: "2-4 years to reach senior level",
      salary: "$120K - $180K"
    },
    "data-science,consulting": {
      title: "Analytics Consultant",
      overlap: 80,
      description: "Provide data-driven strategic insights to help organizations make informed business decisions.",
      skills: ["Business Intelligence", "Client Management", "Data Storytelling", "Industry Knowledge"],
      companies: ["McKinsey", "BCG", "Deloitte", "IBM"],
      timeline: "4-6 years to reach partner level",
      salary: "$130K - $250K"
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const generatePaths = () => {
    setShowPaths(true);
  };

  const getHybridPath = () => {
    if (selectedInterests.length >= 2) {
      const sortedInterests = selectedInterests.slice(0, 2).sort().join(",");
      return hybridPaths[sortedInterests as keyof typeof hybridPaths];
    }
    return null;
  };

  const hybridPath = getHybridPath();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-professional pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <GitBranch className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary text-sm font-medium">Interactive Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Multi-Interest Career
            <span className="text-gradient"> Support</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how multiple career interests can create unique hybrid paths. Explore overlapping 
            opportunities and learn to balance diverse professional passions into a cohesive career strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interest Selection */}
          <Card className="card-professional p-8">
            <div className="flex items-center mb-6">
              <Shuffle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Your Career Interests</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Select multiple career areas that interest you. Our AI will identify overlapping paths and hybrid opportunities.
            </p>

            <div className="space-y-4">
              {careerInterests.map(interest => (
                <div key={interest.id} className="card-professional p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={interest.id}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={() => handleInterestToggle(interest.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <interest.icon className="w-5 h-5 text-primary mr-2" />
                        <label 
                          htmlFor={interest.id}
                          className="text-foreground font-medium cursor-pointer"
                        >
                          {interest.name}
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground">{interest.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={generatePaths}
              className="w-full mt-8 btn-hero"
              disabled={selectedInterests.length < 2}
            >
              <GitBranch className="w-5 h-5 mr-2" />
              Discover Hybrid Paths
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {selectedInterests.length === 1 && (
              <p className="text-sm text-muted-foreground text-center mt-4">
                Select at least 2 interests to explore hybrid career paths
              </p>
            )}

            {/* Sample Selection */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                Try this combination:
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedInterests(["data-science", "product-management"]);
                  setShowPaths(false);
                }}
                className="text-sm text-primary hover:text-primary-dark underline"
              >
                Data Science + Product Management →
              </button>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {showPaths && hybridPath ? (
              <>
                {/* Hybrid Path Overview */}
                <Card className="card-professional p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">{hybridPath.title}</h3>
                    <div className="flex items-center text-success">
                      <span className="text-2xl font-bold">{hybridPath.overlap}%</span>
                      <span className="text-sm ml-1">Match</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{hybridPath.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-lg font-bold text-primary">{hybridPath.salary}</div>
                      <div className="text-sm text-muted-foreground">Salary Range</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <div className="text-lg font-bold text-secondary">{hybridPath.timeline}</div>
                      <div className="text-sm text-muted-foreground">Career Timeline</div>
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {hybridPath.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Companies */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Companies Hiring</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hybridPath.companies.map((company, index) => (
                        <div key={index} className="flex items-center p-2 bg-muted rounded-lg">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary-foreground font-bold text-sm">
                              {company.charAt(0)}
                            </span>
                          </div>
                          <span className="text-foreground font-medium">{company}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Career Transition Strategy */}
                <Card className="card-professional p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Transition Strategy</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Build Foundation</h4>
                        <p className="text-sm text-muted-foreground">
                          Strengthen core skills in your primary interest area while learning basics of the secondary area.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Find Overlaps</h4>
                        <p className="text-sm text-muted-foreground">
                          Look for projects and roles that combine both interests to gain hybrid experience.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-success-foreground font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Specialize</h4>
                        <p className="text-sm text-muted-foreground">
                          Target specific hybrid roles and companies known for valuing multi-disciplinary expertise.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Alternative Paths */}
                <Card className="card-professional p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Alternative Approaches</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground">Sequential Path</h4>
                      <p className="text-sm text-muted-foreground">
                        Master one area first, then transition to combine with the second interest.
                      </p>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground">Parallel Development</h4>
                      <p className="text-sm text-muted-foreground">
                        Develop both skills simultaneously through side projects and cross-functional roles.
                      </p>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground">Consulting Route</h4>
                      <p className="text-sm text-muted-foreground">
                        Use consulting to gain exposure to multiple areas before specializing in hybrid roles.
                      </p>
                    </div>
                  </div>
                </Card>

                <Button variant="outline" className="w-full" onClick={() => setShowPaths(false)}>
                  Explore Different Combinations
                </Button>
              </>
            ) : (
              <Card className="card-professional p-8 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <GitBranch className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Ready to Explore Hybrid Paths?
                </h3>
                <p className="text-muted-foreground">
                  Select multiple career interests to discover unique hybrid opportunities and 
                  learn how to balance diverse professional passions.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPath;