import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Navigation from "../components/Navigation";
import { 
  MapPin, 
  GraduationCap, 
  Target, 
  Briefcase, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock
} from "lucide-react";

const CareerMapping = () => {
  const [formData, setFormData] = useState({
    education: "",
    interests: "",
    goals: ""
  });
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const careerPaths = {
    tech: [
      {
        phase: "Foundation",
        title: "Junior Data Analyst",
        duration: "0-2 years",
        skills: ["Excel", "SQL", "Python Basics", "Statistics"],
        description: "Build core analytical skills and domain knowledge"
      },
      {
        phase: "Growth", 
        title: "Data Scientist",
        duration: "2-4 years",
        skills: ["Machine Learning", "Advanced Python", "R", "Visualization"],
        description: "Develop advanced technical expertise and business acumen"
      },
      {
        phase: "Leadership",
        title: "Senior Data Scientist",
        duration: "4-7 years", 
        skills: ["Team Leadership", "Strategy", "Advanced ML", "Business Intelligence"],
        description: "Lead projects and mentor junior team members"
      },
      {
        phase: "Executive",
        title: "Head of Data Science",
        duration: "7+ years",
        skills: ["Executive Leadership", "Cross-functional Collaboration", "Innovation"],
        description: "Drive organizational data strategy and culture"
      }
    ],
    creative: [
      {
        phase: "Foundation",
        title: "Content Creator",
        duration: "0-2 years",
        skills: ["Photography Basics", "Video Editing", "Social Media", "Storytelling"],
        description: "Build portfolio through personal projects and freelance work"
      },
      {
        phase: "Growth",
        title: "Professional Photographer/Filmmaker",
        duration: "2-4 years",
        skills: ["Advanced Editing", "Lighting", "Client Management", "Brand Building"],
        description: "Establish your brand and expand client base"
      },
      {
        phase: "Leadership",
        title: "Creative Director",
        duration: "4-7 years",
        skills: ["Team Management", "Project Planning", "Creative Vision", "Client Relations"],
        description: "Lead creative projects and mentor junior creators"
      },
      {
        phase: "Executive",
        title: "Studio Owner/Production House",
        duration: "7+ years",
        skills: ["Business Management", "Industry Networking", "Brand Partnerships"],
        description: "Run your own creative business and shape industry trends"
      }
    ]
  };

  const [selectedPath, setSelectedPath] = useState('tech');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-professional pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary text-sm font-medium">Interactive Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Personalized Career
            <span className="text-gradient"> Mapping</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience AI-powered career path visualization. Input your profile and watch as intelligent algorithms 
            create a personalized roadmap tailored to your unique background and aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <Card className="card-professional p-8">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Your Profile</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="education" className="text-foreground font-medium mb-2 block">
                  Education Background
                </Label>
                <Input
                  id="education"
                  placeholder="e.g., Computer Science degree, MBA, Bootcamp"
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="interests" className="text-foreground font-medium mb-2 block">
                  Career Interests
                </Label>
                <Input
                  id="interests"
                  placeholder="e.g., Data Analysis, Machine Learning, Business Strategy"
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="goals" className="text-foreground font-medium mb-2 block">
                  Career Goals
                </Label>
                <Input
                  id="goals"
                  placeholder="e.g., Lead a data team, Work in tech, High salary growth"
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full btn-hero"
                disabled={!formData.education || !formData.interests || !formData.goals}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Career Map
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

              {/* Sample Data Helper */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                Try these sample inputs:
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      education: "Computer Science Degree",
                      interests: "Data Analysis, Machine Learning, Problem Solving",
                      goals: "Lead data science teams, Work at top tech companies"
                    });
                    setSelectedPath('tech');
                  }}
                  className="text-sm text-primary hover:text-primary-dark underline block"
                >
                  Use Sample Data Scientist Profile →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      education: "10th Grade Dropout, Self-Taught",
                      interests: "Photography, Filmmaking, Visual Storytelling",
                      goals: "Build a creative studio, Create impactful visual content"
                    });
                    setSelectedPath('creative');
                  }}
                  className="text-sm text-primary hover:text-primary-dark underline block"
                >
                  Use Sample Creative Profile →
                </button>
              </div>
            </div>
          </Card>          {/* Results */}
          <div className="space-y-6">
            {showResults ? (
              <>
                <Card className="card-professional p-6">
                  <div className="flex items-center mb-4">
                    <Target className="w-6 h-6 text-success mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Your Personalized Career Path</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {careerPaths[selectedPath].map((stage, index) => (
                      <div key={index} className="relative">
                        {/* Connection Line */}
                        {index < careerPaths[selectedPath].length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-16 bg-primary/30" />
                        )}
                        
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                            {index + 1}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="text-lg font-bold text-foreground">{stage.title}</h4>
                              <div className="ml-auto flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                {stage.duration}
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground mb-3">{stage.description}</p>
                            
                            <div className="flex flex-wrap gap-2">
                              {stage.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Action Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="card-professional p-4">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-success mr-2" />
                      <h4 className="font-bold text-foreground">Next Steps</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Start with SQL fundamentals and Excel mastery to build your analytical foundation.
                    </p>
                  </Card>
                  
                  <Card className="card-professional p-4">
                    <div className="flex items-center mb-3">
                      <Briefcase className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-bold text-foreground">Job Match</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      92% compatibility with current Data Analyst openings in your area.
                    </p>
                  </Card>
                </div>

                <Button variant="outline" className="w-full" onClick={() => setShowResults(false)}>
                  Modify Inputs
                </Button>
              </>
            ) : (
              <Card className="card-professional p-8 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Ready to Map Your Career?
                </h3>
                <p className="text-muted-foreground">
                  Complete the form on the left to see your personalized career path visualization 
                  powered by advanced AI algorithms.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMapping;
