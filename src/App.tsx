import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import Landing from "./pages/Landing";
import CareerMapping from "./pages/CareerMapping";
import SkillAnalysis from "./pages/SkillAnalysis";
import MarketInsights from "./pages/MarketInsights";
import MultiPath from "./pages/MultiPath";
import Resilience from "./pages/Resilience";
import Roadmaps from "./pages/Roadmaps";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/career-mapping" element={<CareerMapping />} />
          <Route path="/skill-analysis" element={<SkillAnalysis />} />
          <Route path="/market-insights" element={<MarketInsights />} />
          <Route path="/multi-path" element={<MultiPath />} />
          <Route path="/resilience" element={<Resilience />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
