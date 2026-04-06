import { Navbar } from "./components/geyser/Navbar";
import { HeroSection } from "./components/geyser/HeroSection";
import { WelcomeSection } from "./components/geyser/WelcomeSection";
import { CreatorTypesSection } from "./components/geyser/CreatorTypesSection";
import { CommunitySection } from "./components/geyser/CommunitySection";
import { SuccessStoriesSection } from "./components/geyser/SuccessStoriesSection";
import { PossibilitySection } from "./components/geyser/PossibilitySection";
import { FinalCTASection } from "./components/geyser/FinalCTASection";
import { Footer } from "./components/geyser/Footer";

export default function App() {
  return (
    <div style={{ fontFamily: "var(--geyser-font)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <WelcomeSection />
        <CreatorTypesSection />
        <CommunitySection />
        <SuccessStoriesSection />
        <PossibilitySection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
