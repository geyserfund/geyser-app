import { PiInfinity, PiTarget, PiCheckCircle } from "react-icons/pi";

export function FundraiserTypeSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Choose the fundraiser that fits your project
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Two powerful models designed for different project types and goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Open Fundraiser */}
          <div className="bg-card border-2 border-border rounded-xl p-8 lg:p-10 hover:border-[var(--geyser-primary)] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[var(--geyser-primary-surface)] flex items-center justify-center">
                <PiInfinity className="w-8 h-8 text-[var(--geyser-primary-text)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Open Fundraiser</h3>
                <p className="text-sm text-muted-foreground">Take-it-all model</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Contributions come in as they happen. Any amount helps. Flexible and simple—great when the work continues regardless of hitting a target.
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-bold">Best for:</h4>
              <ul className="space-y-2">
                {[
                  "Ongoing work and evolving projects",
                  "Community support and donations",
                  "Experiments without fixed budgets",
                  "Flexible goals and milestones"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <PiCheckCircle className="w-5 h-5 text-[var(--geyser-primary-text)] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Example</p>
                <p className="text-sm">
                  "We're building open-source education content. Every contribution helps us create more lessons and reach more learners."
                </p>
              </div>
            </div>
          </div>

          {/* All-or-Nothing Campaign */}
          <div className="bg-card border-2 border-border rounded-xl p-8 lg:p-10 hover:border-[var(--geyser-primary)] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[var(--geyser-primary-surface)] flex items-center justify-center">
                <PiTarget className="w-8 h-8 text-[var(--geyser-primary-text)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">All-or-Nothing Campaign</h3>
                <p className="text-sm text-muted-foreground">Goal-based model</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Best for projects that require minimum budget to happen. Supporters feel protected by the structure—useful when the project depends on hitting the goal.
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-bold">Best for:</h4>
              <ul className="space-y-2">
                {[
                  "Production costs and fixed budgets",
                  "One-time launches and deliverables",
                  "Milestone-driven funding",
                  "High-trust structured campaigns"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <PiCheckCircle className="w-5 h-5 text-[var(--geyser-primary-text)] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Example</p>
                <p className="text-sm">
                  "We need $10,000 to produce our documentary. If we don't reach the goal, we'll refund all contributions."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Helper */}
        <div className="bg-gradient-to-br from-[var(--geyser-primary-surface)] to-transparent border border-border rounded-xl p-8 lg:p-10">
          <h3 className="text-lg font-bold mb-6 text-center">Which one should I choose?</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--geyser-primary)] text-white text-xl font-bold mb-4">
                ?
              </div>
              <p className="text-sm font-semibold mb-2">Choose Open Fundraiser if:</p>
              <p className="text-sm text-muted-foreground">
                Your project can start with any amount and grows over time
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--geyser-primary)] text-white text-xl font-bold mb-4">
                !
              </div>
              <p className="text-sm font-semibold mb-2">Choose All-or-Nothing if:</p>
              <p className="text-sm text-muted-foreground">
                Your project needs a specific minimum budget to deliver
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
