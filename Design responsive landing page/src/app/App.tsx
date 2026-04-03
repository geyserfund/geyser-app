import { Button } from "./components/ui/button";
import { HeroSection } from "./components/HeroSection";
import { OverviewSection } from "./components/OverviewSection";
import { BuildPageSection } from "./components/BuildPageSection";
import { FundraiserTypeSection } from "./components/FundraiserTypeSection";
import { PaymentSetupSection } from "./components/PaymentSetupSection";
import { CreatorToolsSection } from "./components/CreatorToolsSection";
import { LaunchPlansSection } from "./components/LaunchPlansSection";
import { LaunchStrongSection } from "./components/LaunchStrongSection";
import { MomentumSection } from "./components/MomentumSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <OverviewSection />
      <BuildPageSection />
      <FundraiserTypeSection />
      <PaymentSetupSection />
      <CreatorToolsSection />
      <LaunchPlansSection />
      <LaunchStrongSection />
      <MomentumSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
