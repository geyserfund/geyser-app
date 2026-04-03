import {
  PiTarget,
  PiShoppingBag,
  PiNotePencil,
  PiUsersThree,
  PiChartLine,
  PiPackage,
  PiCreditCard
} from "react-icons/pi";

export function CreatorToolsSection() {
  const tools = [
    {
      icon: PiTarget,
      title: "Goals",
      description: "Set visible milestones that show supporters what progress unlocks",
      benefit: "Create momentum with achievable targets",
      size: "large"
    },
    {
      icon: PiShoppingBag,
      title: "Products & Rewards",
      description: "Offer digital/physical products, pre-orders, merch, tickets, memberships, or recognition",
      benefit: "Turn contributions into tangible value",
      size: "large"
    },
    {
      icon: PiNotePencil,
      title: "Posts & Updates",
      description: "Keep supporters engaged with progress posts, updates, and shareable momentum",
      benefit: "Build trust through consistent communication",
      size: "medium"
    },
    {
      icon: PiUsersThree,
      title: "Affiliates",
      description: "Incentivize others to share your project and extend your distribution",
      benefit: "Amplify reach through community advocates",
      size: "medium"
    },
    {
      icon: PiChartLine,
      title: "Insights",
      description: "Learn what's working and understand your project's performance",
      benefit: "Make data-driven decisions",
      size: "small"
    },
    {
      icon: PiPackage,
      title: "Delivery & Accounting",
      description: "Manage orders, fulfillment, payments, and exports effortlessly",
      benefit: "Stay organized as you scale",
      size: "small"
    },
    {
      icon: PiCreditCard,
      title: "Fiat Support",
      description: "Reduce friction for supporters who want familiar payment methods",
      benefit: "Increase conversion rates",
      size: "small"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Use the tools that turn interest into funding
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Geyser is not just a project page builder—it's a complete fundraising toolkit designed to help you succeed.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Large tools - full width on mobile, span 2 cols on desktop */}
          {tools.filter(t => t.size === "large").map((tool, idx) => (
            <div
              key={idx}
              className="lg:col-span-2 bg-card border border-border rounded-xl p-8 hover:border-[var(--geyser-primary)] transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--geyser-primary-surface)] flex items-center justify-center group-hover:bg-[var(--geyser-primary)] transition-colors">
                  <tool.icon className="w-7 h-7 text-[var(--geyser-primary-text)] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--geyser-primary-text)] bg-[var(--geyser-primary-surface)] px-3 py-1.5 rounded-full">
                    {tool.benefit}
                  </div>
                </div>
              </div>

              {/* Visual mockup for large tools */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  {tool.title === "Goals" ? (
                    <>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-semibold">Goal Progress</span>
                        <span className="text-muted-foreground">$8,500 / $10,000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-[var(--geyser-primary)] h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">85% funded • 15 days left</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded"></div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold">Limited Edition Supporter Pack</p>
                          <p className="text-xs text-muted-foreground">$50 • 23 claimed</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Medium tools - span 2 cols on desktop */}
          {tools.filter(t => t.size === "medium").map((tool, idx) => (
            <div
              key={idx}
              className="lg:col-span-2 bg-card border border-border rounded-xl p-6 hover:border-[var(--geyser-primary)] transition-all group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center group-hover:bg-[var(--geyser-primary)] transition-colors">
                  <tool.icon className="w-6 h-6 text-[var(--geyser-primary-text)] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                  <p className="text-xs text-[var(--geyser-primary-text)] font-semibold">{tool.benefit}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Small tools - single col */}
          {tools.filter(t => t.size === "small").map((tool, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-6 hover:border-[var(--geyser-primary)] transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center mb-4 group-hover:bg-[var(--geyser-primary)] transition-colors">
                <tool.icon className="w-5 h-5 text-[var(--geyser-primary-text)] group-hover:text-white" />
              </div>
              <h3 className="font-bold mb-2">{tool.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
              <p className="text-xs text-[var(--geyser-primary-text)] font-semibold">{tool.benefit}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-[var(--geyser-primary-surface)] to-transparent border border-border rounded-lg px-8 py-4">
            <p className="text-sm text-muted-foreground">
              All tools included with every project • No hidden fees or upgrades required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
