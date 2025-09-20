import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import FeaturesGrid from "../components/FeaturesGrid";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesGrid />
      </main>
    </div>
  );
};

export default Landing;