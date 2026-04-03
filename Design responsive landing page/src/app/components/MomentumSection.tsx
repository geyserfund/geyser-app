import { PiNotePencil, PiCalendar, PiHeart, PiChartBar } from "react-icons/pi";

export function MomentumSection() {
  const updateTypes = [
    {
      icon: PiNotePencil,
      title: "Progress updates",
      description: "Share what you're building, wins, and honest setbacks",
      frequency: "Every 1-2 weeks"
    },
    {
      icon: PiChartBar,
      title: "Milestone announcements",
      description: "Celebrate goals reached and momentum created",
      frequency: "As they happen"
    },
    {
      icon: PiHeart,
      title: "Supporter recognition",
      description: "Thank and highlight your community",
      frequency: "Monthly"
    },
    {
      icon: PiCalendar,
      title: "Impact reports",
      description: "Show what funding has enabled and what's next",
      frequency: "Quarterly"
    }
  ];

  const principles = [
    "Share progress, not perfection",
    "Be transparent about wins and setbacks",
    "Use photos, videos, and metrics",
    "Make updates easy to share",
    "Turn first supporters into long-term backers"
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Keep the project alive after the first wave
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Successful fundraising isn't just the launch moment—it's the ongoing relationship with your supporters.
          </p>
        </div>

        {/* Update Types */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {updateTypes.map((type, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-6 hover:border-[var(--geyser-primary)] transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center">
                  <type.icon className="w-6 h-6 text-[var(--geyser-primary-text)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold">{type.title}</h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded">{type.frequency}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Update Example */}
        <div className="bg-card border border-border rounded-xl p-8 lg:p-10 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold">Your Project Name</h4>
                  <span className="text-xs text-muted-foreground">• 3 days ago</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Update: We hit our first milestone! 🎉</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Thanks to 47 amazing supporters, we've reached our $5,000 goal! This means we can now move forward
                  with production. Here's what we've accomplished this week and what's coming next...
                </p>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">47</p>
                      <p className="text-xs text-muted-foreground">Supporters</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">$5,234</p>
                      <p className="text-xs text-muted-foreground">Raised</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">104%</p>
                      <p className="text-xs text-muted-foreground">Of goal</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <button className="hover:text-foreground">❤️ 23</button>
                  <button className="hover:text-foreground">💬 5 comments</button>
                  <button className="hover:text-foreground">🔗 Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="bg-gradient-to-br from-[var(--geyser-primary-surface)] to-transparent border border-border rounded-xl p-8 lg:p-10">
          <h3 className="text-xl font-bold mb-6 text-center">Communication principles that build trust</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {principles.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-card rounded-lg p-4">
                <div className="w-6 h-6 rounded-full bg-[var(--geyser-primary)] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span className="text-sm font-medium">{principle}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
            Trust compounds when communication is consistent. Regular updates turn one-time supporters into long-term advocates.
          </p>
        </div>
      </div>
    </section>
  );
}
