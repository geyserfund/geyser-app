import { Button } from "./ui/button";
import { PiRocket, PiChartLine } from "react-icons/pi";

export function FinalCTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-[var(--geyser-primary-surface)]">
      <div className="mx-auto max-w-[900px] px-6 lg:px-12">
        <div className="text-center space-y-8">
          {/* Main content */}
          <div className="space-y-4">
            <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold">
              Ready to launch your project?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              You don't need perfect conditions to begin. You need a clear story, the right setup,
              and the confidence to launch.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[var(--geyser-primary)] hover:bg-[var(--geyser-primary-hover)] text-[var(--geyser-primary-text)] px-10 py-6 text-base rounded-lg"
            >
              <PiRocket className="mr-2 h-5 w-5" />
              Launch your project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted px-10 py-6 text-base rounded-lg"
            >
              <PiChartLine className="mr-2 h-5 w-5" />
              Compare launch plans
            </Button>
          </div>

          {/* Social proof */}
          <div className="pt-8">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-card border border-border rounded-xl px-8 py-6">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">1,000+</p>
                <p className="text-xs text-muted-foreground">Projects launched</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">$5M+</p>
                <p className="text-xs text-muted-foreground">Raised by creators</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">50k+</p>
                <p className="text-xs text-muted-foreground">Supporters worldwide</p>
              </div>
            </div>
          </div>

          {/* Trust statement */}
          <p className="text-sm text-muted-foreground italic max-w-xl mx-auto pt-4">
            Join creators building the future with the tools, visibility, and community that Geyser provides.
          </p>
        </div>
      </div>
    </section>
  );
}
