import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import Navigation from "../components/Navigation";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen,
  Target,
  Zap
} from "lucide-react";

const SkillAnalysis = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const availableSkills = [
    { id: "python", name: "Python Programming", category: "Technical" },
    { id: "sql", name: "SQL", category: "Technical" },
    { id: "excel", name: "Advanced Excel", category: "Technical" },
    { id: "tableau", name: "Tableau", category: "Technical" },
    { id: "machine-learning", name: "Machine Learning", category: "Technical" },
    { id: "statistics", name: "Statistics", category: "Technical" },
    { id: "communication", name: "Communication", category: "Soft Skills" },
    { id: "leadership", name: "Leadership", category: "Soft Skills" },
    { id: "project-management", name: "Project Management", category: "Soft Skills" },
    { id: "critical-thinking", name: "Critical Thinking", category: "Soft Skills" }
  ];

  const skillGapAnalysis = {
    strong: ["python", "sql", "communication", "critical-thinking"],
    developing: ["excel", "statistics"],
    missing: ["machine-learning", "tableau", "leadership", "project-management"]
  };

  const learningPaths = [
    {
      skill: "Machine Learning",
      priority: "High",
      courses: ["Introduction to ML", "Supervised Learning", "Neural Networks"],
      duration: "3-4 months",
      provider: "Coursera"
    },
    {
      skill: "Tableau",
      priority: "Medium", 
      courses: ["Tableau Fundamentals", "Advanced Dashboards", "Data Storytelling"],
      duration: "2-3 months",
      provider: "Udemy"
    },
    {
      skill: "Leadership",
      priority: "Medium",
      courses: ["Leadership Principles", "Team Management", "Decision Making"],
      duration: "2-3 months",
      provider: "LinkedIn Learning"
    }
  ];

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  const getSkillStatus = (skillId: string) => {
    if (skillGapAnalysis.strong.includes(skillId)) return "strong";
    if (skillGapAnalysis.developing.includes(skillId)) return "developing"; 
    if (skillGapAnalysis.missing.includes(skillId)) return "missing";
    return "unassessed";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "text-success";
      case "developing": return "text-warning";
      case "missing": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "strong": return <CheckCircle className="w-4 h-4" />;
      case "developing": return <TrendingUp className="w-4 h-4" />;
      case "missing": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-professional pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <BarChart3 className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary text-sm font-medium">Interactive Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI-Based Skill
            <span className="text-gradient"> Gap Analysis</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your skill strengths and gaps with intelligent analysis. Get personalized learning 
            recommendations to bridge the gap between your current abilities and career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills Selection */}
          <Card className="card-professional p-8">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Your Current Skills</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Select the skills you currently possess. Our AI will analyze gaps for Data Science roles.
            </p>

            <div className="space-y-6">
              {["Technical", "Soft Skills"].map(category => (
                <div key={category}>
                  <h3 className="font-semibold text-foreground mb-3">{category}</h3>
                  <div className="space-y-3">
                    {availableSkills
                      .filter(skill => skill.category === category)
                      .map(skill => (
                        <div key={skill.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={skill.id}
                            checked={selectedSkills.includes(skill.id)}
                            onCheckedChange={() => handleSkillToggle(skill.id)}
                          />
                          <label 
                            htmlFor={skill.id}
                            className="text-foreground font-medium cursor-pointer flex-1"
                          >
                            {skill.name}
                          </label>
                          {showAnalysis && (
                            <div className={`flex items-center space-x-1 ${getStatusColor(getSkillStatus(skill.id))}`}>
                              {getStatusIcon(getSkillStatus(skill.id))}
                            </div>
                          )}
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleAnalyze}
              className="w-full mt-8 btn-hero"
              disabled={selectedSkills.length === 0}
            >
              <Zap className="w-5 h-5 mr-2" />
              Analyze Skill Gaps
            </Button>

            {/* Sample Data Helper */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                Quick start:
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSkills(["python", "sql", "communication", "critical-thinking", "excel", "statistics"]);
                  setShowAnalysis(false);
                }}
                className="text-sm text-primary hover:text-primary-dark underline"
              >
                Use Sample Junior Data Analyst Skills →
              </button>
            </div>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-6">
            {showAnalysis ? (
              <>
                {/* Skill Status Overview */}
                <Card className="card-professional p-6">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Skill Gap Report</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">{skillGapAnalysis.strong.length}</div>
                      <div className="text-sm text-muted-foreground">Strong Skills</div>
                    </div>
                    <div className="text-center p-4 bg-warning/10 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{skillGapAnalysis.developing.length}</div>
                      <div className="text-sm text-muted-foreground">Developing</div>
                    </div>
                    <div className="text-center p-4 bg-destructive/10 rounded-lg">
                      <div className="text-2xl font-bold text-destructive">{skillGapAnalysis.missing.length}</div>
                      <div className="text-sm text-muted-foreground">Skill Gaps</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-success mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Strong Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGapAnalysis.strong.map(skillId => {
                          const skill = availableSkills.find(s => s.id === skillId);
                          return (
                            <span key={skillId} className="px-3 py-1 bg-success/10 text-success text-sm rounded-full">
                              {skill?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-destructive mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Priority Gaps
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGapAnalysis.missing.map(skillId => {
                          const skill = availableSkills.find(s => s.id === skillId);
                          return (
                            <span key={skillId} className="px-3 py-1 bg-destructive/10 text-destructive text-sm rounded-full">
                              {skill?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Learning Recommendations */}
                <Card className="card-professional p-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Recommended Learning Paths</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {learningPaths.map((path, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-foreground">{path.skill}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            path.priority === "High" 
                              ? "bg-destructive/10 text-destructive" 
                              : "bg-warning/10 text-warning"
                          }`}>
                            {path.priority} Priority
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          Duration: {path.duration} • Provider: {path.provider}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {path.courses.map((course, courseIndex) => (
                            <span key={courseIndex} className="px-2 py-1 bg-muted text-xs rounded">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Button variant="outline" className="w-full" onClick={() => setShowAnalysis(false)}>
                  Modify Skills Selection
                </Button>
              </>
            ) : (
              <Card className="card-professional p-8 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Ready for Skill Analysis?
                </h3>
                <p className="text-muted-foreground">
                  Select your current skills on the left to receive a comprehensive gap analysis 
                  and personalized learning recommendations.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;