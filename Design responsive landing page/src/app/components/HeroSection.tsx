import { Button } from "./ui/button";
import { PiRocket, PiCheckCircle } from "react-icons/pi";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[var(--geyser-primary-surface)] to-transparent">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-[2rem] lg:text-[3rem] font-bold leading-tight tracking-tight">
                How to fundraise on Geyser
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                A clear playbook for launching, getting funded, and building momentum with the tools Geyser gives creators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[var(--geyser-primary)] hover:bg-[var(--geyser-primary-hover)] text-[var(--geyser-primary-text)] px-8 py-6 text-base rounded-lg"
              >
                <PiRocket className="mr-2 h-5 w-5" />
                Launch your project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted px-8 py-6 text-base rounded-lg"
              >
                Compare launch plans
              </Button>
            </div>

            {/* How it works strip */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                How it works
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {[
                  { step: "1", label: "Build your page" },
                  { step: "2", label: "Choose fundraiser type" },
                  { step: "3", label: "Configure payouts" },
                  { step: "4", label: "Activate your tools" },
                  { step: "5", label: "Launch strong" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--geyser-primary)] text-[var(--geyser-primary-text)] flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <p className="text-sm leading-tight mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center">
                    <PiCheckCircle className="w-6 h-6 text-[var(--geyser-primary-text)]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Launch Checklist</h3>
                    <p className="text-sm text-muted-foreground">Ready to go live</p>
                  </div>
                </div>

                {[
                  "Project story complete",
                  "Fundraiser type selected",
                  "Wallet configured",
                  "Goals & rewards added",
                  "Launch announcement drafted"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <PiCheckCircle className="w-5 h-5 text-[var(--geyser-primary-text)]" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}

                <Button className="w-full bg-[var(--geyser-primary)] hover:bg-[var(--geyser-primary-hover)] text-[var(--geyser-primary-text)]">
                  Launch Project
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/4 -right-12 w-64 h-64 bg-[var(--geyser-primary)] opacity-10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
