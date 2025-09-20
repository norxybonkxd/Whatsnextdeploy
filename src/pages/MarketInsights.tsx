import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Navigation from "../components/Navigation";
import { 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Users, 
  BarChart3,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

const MarketInsights = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [selectedLocation, setSelectedLocation] = useState("san-francisco");
  const [selectedTimeframe, setSelectedTimeframe] = useState("12-months");

  const marketData = {
    jobGrowth: "+15.2%",
    averageSalary: "$125,000",
    totalOpenings: "2,847",
    demandTrend: "High",
    competitionLevel: "Moderate"
  };

  const topSkills = [
    { skill: "Python", demand: 92, growth: "+18%" },
    { skill: "Machine Learning", demand: 87, growth: "+25%" },
    { skill: "SQL", demand: 85, growth: "+12%" },
    { skill: "AWS", demand: 82, growth: "+22%" },
    { skill: "Tableau", demand: 78, growth: "+15%" },
    { skill: "R Programming", demand: 75, growth: "+10%" }
  ];

  const salaryRanges = [
    { level: "Entry Level (0-2 years)", range: "$80K - $110K", median: "$95K" },
    { level: "Mid Level (3-5 years)", range: "$110K - $150K", median: "$130K" },
    { level: "Senior Level (6-8 years)", range: "$150K - $200K", median: "$175K" },
    { level: "Lead Level (9+ years)", range: "$200K - $300K", median: "$250K" }
  ];

  const industryTrends = [
    { month: "Jan", jobs: 1200, applications: 8500 },
    { month: "Feb", jobs: 1350, applications: 9200 },
    { month: "Mar", jobs: 1500, applications: 10100 },
    { month: "Apr", jobs: 1650, applications: 11200 },
    { month: "May", jobs: 1800, applications: 12000 },
    { month: "Jun", jobs: 1950, applications: 12500 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-professional pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <TrendingUp className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary text-sm font-medium">Interactive Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Real-Time Market
            <span className="text-gradient"> Insights</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access live labor market intelligence with dynamic dashboards, salary trends, and demand analytics. 
            Make data-driven career decisions with real-time market insights.
          </p>
        </div>

        {/* Filters */}
        <Card className="card-professional p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-bold text-foreground">Market Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="new-york">New York, NY</SelectItem>
                  <SelectItem value="seattle">Seattle, WA</SelectItem>
                  <SelectItem value="austin">Austin, TX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Time Period</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-months">Last 3 Months</SelectItem>
                  <SelectItem value="6-months">Last 6 Months</SelectItem>
                  <SelectItem value="12-months">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </Card>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="card-professional p-6 text-center">
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">{marketData.jobGrowth}</div>
            <div className="text-sm text-muted-foreground">Job Growth</div>
          </Card>
          
          <Card className="card-professional p-6 text-center">
            <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">{marketData.averageSalary}</div>
            <div className="text-sm text-muted-foreground">Avg. Salary</div>
          </Card>
          
          <Card className="card-professional p-6 text-center">
            <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">{marketData.totalOpenings}</div>
            <div className="text-sm text-muted-foreground">Open Positions</div>
          </Card>
          
          <Card className="card-professional p-6 text-center">
            <BarChart3 className="w-8 h-8 text-warning mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">{marketData.demandTrend}</div>
            <div className="text-sm text-muted-foreground">Market Demand</div>
          </Card>
          
          <Card className="card-professional p-6 text-center">
            <MapPin className="w-8 h-8 text-destructive mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">{marketData.competitionLevel}</div>
            <div className="text-sm text-muted-foreground">Competition</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skills in Demand */}
          <Card className="card-professional p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Top Skills in Demand</h3>
            <div className="space-y-4">
              {topSkills.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{item.skill}</span>
                      <span className="text-sm text-success font-medium">{item.growth}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.demand}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Salary Ranges */}
          <Card className="card-professional p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Salary Ranges by Experience</h3>
            <div className="space-y-4">
              {salaryRanges.map((range, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{range.level}</h4>
                    <span className="text-primary font-bold">{range.median}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Range: {range.range}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Trend Chart */}
        <Card className="card-professional p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Market Trends (Last 6 Months)</h3>
          <div className="space-y-6">
            {/* Simple Bar Chart Representation */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Job Postings Growth</h4>
              <div className="grid grid-cols-6 gap-4">
                {industryTrends.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="relative h-32 bg-muted rounded-lg mb-2 flex items-end justify-center p-2">
                      <div 
                        className="bg-primary rounded-t-lg w-full transition-all duration-300"
                        style={{ 
                          height: `${(data.jobs / Math.max(...industryTrends.map(d => d.jobs))) * 100}%`,
                          minHeight: '20px'
                        }}
                      />
                    </div>
                    <div className="text-xs font-medium text-foreground">{data.month}</div>
                    <div className="text-xs text-muted-foreground">{data.jobs}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-3">Key Market Insights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Job postings have increased 62% compared to last year</li>
                <li>• Machine Learning skills show highest demand growth (+25%)</li>
                <li>• Remote work options available in 78% of positions</li>
                <li>• Median time to fill positions: 45 days</li>
                <li>• Top hiring companies: Google, Meta, Amazon, Microsoft</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketInsights;