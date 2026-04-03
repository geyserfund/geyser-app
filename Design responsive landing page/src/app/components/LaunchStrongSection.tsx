import { PiClock, PiUsers, PiMegaphone, PiChartLine } from "react-icons/pi";

export function LaunchStrongSection() {
  const timeline = [
    {
      phase: "Before Launch",
      icon: PiUsers,
      duration: "1-2 weeks before",
      color: "bg-blue-500",
      tasks: [
        "Draft your launch announcement",
        "Build a small list of early supporters",
        "Set a first goal that creates momentum",
        "Prepare visuals and shareable content",
        "Test your project page with trusted friends"
      ]
    },
    {
      phase: "Launch Day",
      icon: PiMegaphone,
      duration: "Day 0",
      color: "bg-[var(--geyser-primary)]",
      tasks: [
        "Publish your announcement across channels",
        "Personally message your closest supporters",
        "Share on social media with compelling hook",
        "Launch like an event, not just a button",
        "Respond to every comment and question"
      ]
    },
    {
      phase: "Days 3-7",
      icon: PiChartLine,
      duration: "First week",
      color: "bg-green-500",
      tasks: [
        "Post your first progress update",
        "Thank early supporters publicly",
        "Use social proof to attract more backers",
        "Share milestones as they happen",
        "Do not disappear after day one"
      ]
    }
  ];

  const mistakes = [
    "Launching without telling anyone first",
    "Setting goals too high for initial momentum",
    "Disappearing after publishing",
    "Waiting for 'perfect' conditions",
    "Not having shareable launch content ready"
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Your first 72 hours matter most
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            A strong launch isn't about perfection—it's about preparation, momentum, and showing up for your supporters.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 mb-16">
          {timeline.map((phase, idx) => (
            <div key={idx} className="relative">
              {/* Connector line */}
              {idx < timeline.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border hidden lg:block"></div>
              )}

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Icon & Phase */}
                <div className="flex items-start gap-4 lg:w-64 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center text-white`}>
                    <phase.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{phase.phase}</h3>
                    <p className="text-sm text-muted-foreground">{phase.duration}</p>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 bg-card border border-border rounded-xl p-6">
                  <ul className="space-y-3">
                    {phase.tasks.map((task, taskIdx) => (
                      <li key={taskIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-[var(--geyser-primary)] flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistakes */}
        <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl p-8 lg:p-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">Common mistakes to avoid</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {mistakes.map((mistake, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-background/50 rounded-lg p-4">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 text-destructive flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    ✕
                  </div>
                  <span className="text-sm">{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Momentum visual */}
        <div className="mt-12 bg-gradient-to-br from-[var(--geyser-primary-surface)] to-transparent border border-border rounded-xl p-8 text-center">
          <PiClock className="w-12 h-12 mx-auto mb-4 text-[var(--geyser-primary-text)]" />
          <h3 className="text-lg font-bold mb-2">What momentum looks like</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Early momentum compounds. The first supporters attract more supporters. The first share leads to more shares.
            Focus on creating energy in the first 72 hours, and maintain it through your first week.
          </p>
        </div>
      </div>
    </section>
  );
}
