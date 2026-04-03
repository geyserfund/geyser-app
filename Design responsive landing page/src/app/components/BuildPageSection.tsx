import { PiTextT, PiImage, PiLink, PiTag, PiNotePencil } from "react-icons/pi";

export function BuildPageSection() {
  const setupElements = [
    { icon: PiTextT, label: "Project title & identifier", detail: "Clear, memorable name and unique URL" },
    { icon: PiNotePencil, label: "One-line objective", detail: "Instant understanding of your goal" },
    { icon: PiImage, label: "Project & header visuals", detail: "Make your project feel real and alive" },
    { icon: PiLink, label: "Contact & project links", detail: "Build trust through transparency" },
    { icon: PiTag, label: "Tags & category", detail: "Help supporters discover your project" }
  ];

  const storytellingFramework = [
    { title: "Define your why", desc: "What drives this project?" },
    { title: "Start with a hook", desc: "Capture attention immediately" },
    { title: "Tell your story", desc: "Share the journey and context" },
    { title: "Show proof of work", desc: "Build credibility with progress" },
    { title: "Picture the future", desc: "Help supporters see the impact" },
    { title: "Clearly ask for support", desc: "Make the call to action direct" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Build a page supporters can trust in seconds
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl">
            Every element of your project page helps supporters understand what you're building and decide to back you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Setup Elements */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Key project setup elements</h3>
            {setupElements.map((element, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:border-[var(--geyser-primary)] transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center">
                  <element.icon className="w-5 h-5 text-[var(--geyser-primary-text)]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{element.label}</h4>
                  <p className="text-sm text-muted-foreground">{element.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Mock Project Page */}
          <div className="relative">
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
              {/* Mock header image */}
              <div className="h-48 bg-gradient-to-br from-[var(--geyser-primary)] to-[var(--geyser-primary-hover)]"></div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-muted -mt-12 border-4 border-card"></div>
                  <div className="flex-1 mt-2">
                    <h3 className="font-bold text-lg">Your Project Title</h3>
                    <p className="text-sm text-muted-foreground">@project-identifier</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Building the future of open-source tools</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-muted rounded">Technology</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Open Source</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tell your story here. Explain what you're building, why it matters, and who it helps...
                  </p>
                </div>
              </div>
            </div>

            {/* Annotation */}
            <div className="absolute -right-4 top-1/3 hidden xl:block">
              <div className="bg-[var(--geyser-primary)] text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                Clear visuals build trust ✓
              </div>
            </div>
          </div>
        </div>

        {/* Storytelling Framework */}
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12">
          <h3 className="text-xl font-bold mb-6">How to write a story people support</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storytellingFramework.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--geyser-primary-surface)] text-[var(--geyser-primary-text)] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-sm">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-8">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
