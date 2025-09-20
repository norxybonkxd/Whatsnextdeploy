import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  MapPin, 
  BarChart3, 
  TrendingUp, 
  GitBranch, 
  Shield, 
  Network,
  ArrowRight,
  Sparkles
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      id: 1,
      title: "Personalized Career Mapping",
      description: "AI-powered career path visualization based on your education, interests, and goals. See your journey mapped out with precision.",
      icon: MapPin,
      path: "/career-mapping",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      demo: "Input your profile and watch as AI creates your personalized career roadmap in real-time."
    },
    {
      id: 2,
      title: "AI-Based Skill Gap Analysis", 
      description: "Identify skill gaps and receive tailored learning recommendations. Bridge the gap between where you are and where you want to be.",
      icon: BarChart3,
      path: "/skill-analysis",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      demo: "Upload your skills and get instant gap analysis with curated learning paths."
    },
    {
      id: 3,
      title: "Real-Time Market Insights",
      description: "Access live labor market data, salary trends, and industry demands. Make informed decisions with up-to-date intelligence.",
      icon: TrendingUp,
      path: "/market-insights",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      demo: "Explore interactive dashboards showing real job market trends and opportunities."
    },
    {
      id: 4,
      title: "Multi-Interest Career Support",
      description: "Balance multiple career interests with smart path optimization. Discover how different careers can complement each other.",
      icon: GitBranch,
      path: "/multi-path",
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      demo: "Select multiple interests and see how they can create unique, hybrid career paths."
    },
    {
      id: 5,
      title: "Career Resilience Planning",
      description: "Build robust backup plans and alternative career scenarios. Prepare for any future with strategic Plan B and C options.",
      icon: Shield,
      path: "/resilience",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
      demo: "Scenario planning tools help you create bulletproof career strategies for any future."
    },
    {
      id: 6,
      title: "Interactive Flowchart Roadmaps",
      description: "Navigate dynamic, clickable career flowcharts. Explore different routes and see how decisions impact your journey.",
      icon: Network,
      path: "/roadmaps",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
      demo: "Click through interactive flowcharts that adapt based on your choices and preferences."
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-professional">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary text-sm font-medium">Interactive Demo Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Experience the
            <span className="text-gradient"> Future of Career Planning</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore our comprehensive suite of professional tools designed to guide your career journey 
            with intelligence, precision, and strategic foresight.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="card-interactive group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                {/* Feature Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Feature Content */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Demo Description */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground italic">
                    Demo: {feature.demo}
                  </p>
                </div>

                {/* Feature CTA */}
                <Link to={feature.path}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Try Interactive Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-muted-foreground mb-6">
              Start with our guided demo tour to experience all features in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Demo Tour
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;