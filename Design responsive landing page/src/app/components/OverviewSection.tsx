import { PiTarget, PiChartLine, PiUsers, PiLightbulb, PiRocket } from "react-icons/pi";

export function OverviewSection() {
  const pillars = [
    {
      icon: PiLightbulb,
      title: "A compelling story",
      description: "Make supporters understand what you're building and why it matters"
    },
    {
      icon: PiTarget,
      title: "The right fundraising model",
      description: "Choose the structure that fits your project's goals and timeline"
    },
    {
      icon: PiUsers,
      title: "Clear setup & trust signals",
      description: "Build credibility through verification, transparency, and professional presentation"
    },
    {
      icon: PiChartLine,
      title: "Useful creator tools",
      description: "Turn interest into funding with goals, rewards, posts, and insights"
    },
    {
      icon: PiRocket,
      title: "Strong momentum",
      description: "Launch like an event and maintain consistent communication with supporters"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            What makes a fundraiser succeed on Geyser
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            A strong Geyser fundraiser combines story, structure, and momentum to turn visitors into supporters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group p-6 lg:p-8 bg-card border border-border rounded-xl hover:border-[var(--geyser-primary)] transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center mb-4 group-hover:bg-[var(--geyser-primary)] group-hover:text-white transition-colors">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
