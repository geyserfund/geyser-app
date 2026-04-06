import { motion } from "motion/react";
import { Quote } from "lucide-react";

const COMMUNITY_IMG = "https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzc3Jvb3RzJTIwY29tbXVuaXR5JTIwb3JnYW5pemluZyUyMGV2ZW50JTIwcGVvcGxlfGVufDF8fHx8MTc3NTA2NTAzMHww&ixlib=rb-4.1.0&q=80&w=1080";
const EDUCATION_IMG = "https://images.unsplash.com/photo-1694286067026-a8aa654481f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWFjaGVyJTIwdGVhY2hpbmclMjB3b3Jrc2hvcCUyMEFmcmljYXxlbnwxfHx8fDE3NzUwNjUwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080";

const testimonials = [
  {
    quote: "I launched thinking a small circle of friends might show up. Within two weeks, 200 people from 14 countries were backing the project. That felt like something real.",
    author: "Maria S.",
    role: "Filmmaker, Brazil",
    color: "#00f5dc",
  },
  {
    quote: "What surprised me was how engaged people were. They shared the project, posted about it, brought others in. The community kept the campaign alive.",
    author: "Kofi A.",
    role: "Open Source Developer, Ghana",
    color: "#a78bfa",
  },
  {
    quote: "On day one I had 12 backers. That was enough to keep going. Now we've trained over 300 students and the work keeps growing.",
    author: "Isabella M.",
    role: "Community Educator, El Salvador",
    color: "#34d399",
  },
];

const pillars = [
  {
    title: "Backers who invest in the mission",
    body: "Everyone who supports your project on Geyser has chosen to believe in it. They share your work, amplify your reach, and help connect you to people you wouldn't have found on your own.",
    accent: "#00f5dc",
  },
  {
    title: "Strong foundations start small",
    body: "The projects that grow on Geyser often begin with a clear mission and a handful of true believers. That foundation builds something lasting.",
    accent: "#a78bfa",
  },
  {
    title: "Every contribution carries meaning",
    body: "A contribution on Geyser is a signal. It tells the creator their work matters and tells others the project is worth getting behind.",
    accent: "#34d399",
  },
  {
    title: "Global builders, local impact",
    body: "Creators from Lagos to Lima, from Berlin to Bangkok bring their projects here. The community that forms crosses every boundary.",
    accent: "#f59e0b",
  },
];

export function CommunitySection() {
  return (
    <section
      style={{
        backgroundColor: "var(--geyser-bg)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 80 }} className="community-header-grid">

          {/* Left: images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative" }}
          >
            <div style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              aspectRatio: "4/5",
            }}>
              <img
                src={COMMUNITY_IMG}
                alt="Community gathering"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)",
              }} />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                position: "absolute",
                bottom: -24,
                right: -24,
                width: 220,
                borderRadius: 16,
                overflow: "hidden",
                border: "3px solid var(--geyser-bg)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
              }}
              className="community-float-card"
            >
              <img
                src={EDUCATION_IMG}
                alt="Education"
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
              <div style={{
                padding: "12px 14px",
                backgroundColor: "var(--geyser-bg)",
                borderTop: "1px solid var(--geyser-border)",
              }}>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--geyser-text)",
                  marginBottom: 2,
                }}>
                  80+ countries
                </div>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 11,
                  color: "var(--geyser-text-muted)",
                }}>
                  Creators building globally
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--geyser-primary-text)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 16,
            }}>
              The Geyser difference
            </span>

            <h2 style={{
              fontFamily: "var(--geyser-font)",
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--geyser-text)",
              marginBottom: 24,
            }}>
              Every launch has a
              <br />community behind it
            </h2>

            <p style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--geyser-text-muted)",
              marginBottom: 40,
            }}>
              When you launch on Geyser, your supporters become part of the story. They share your work, spread your mission, and build momentum that takes the project further.
            </p>

            {/* Pillars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {pillars.slice(0, 2).map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "16px",
                    borderRadius: 12,
                    backgroundColor: "var(--geyser-neutral-panel)",
                    border: "1px solid var(--geyser-border)",
                  }}
                >
                  <div style={{
                    width: 4,
                    minHeight: 40,
                    borderRadius: 4,
                    backgroundColor: p.accent,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{
                      fontFamily: "var(--geyser-font)",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--geyser-text)",
                      marginBottom: 4,
                    }}>
                      {p.title}
                    </div>
                    <div style={{
                      fontFamily: "var(--geyser-font)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--geyser-text-muted)",
                    }}>
                      {p.body}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: "28px",
                borderRadius: 16,
                backgroundColor: "var(--geyser-neutral-panel)",
                border: "1px solid var(--geyser-border)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent top bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: t.color,
                borderRadius: "16px 16px 0 0",
              }} />

              <Quote size={24} style={{ color: t.color, marginBottom: 16, opacity: 0.7 }} />

              <p style={{
                fontFamily: "var(--geyser-font-accent)",
                fontSize: 16,
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "var(--geyser-text)",
                marginBottom: 20,
                fontWeight: 300,
              }}>
                "{t.quote}"
              </p>

              <div>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--geyser-text)",
                }}>
                  {t.author}
                </div>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 12,
                  color: "var(--geyser-text-muted)",
                }}>
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 20 }} className="pillars-grid">
          {pillars.slice(2).map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: "flex",
                gap: 16,
                padding: "20px",
                borderRadius: 12,
                backgroundColor: "var(--geyser-neutral-panel)",
                border: "1px solid var(--geyser-border)",
              }}
            >
              <div style={{
                width: 4,
                minHeight: 40,
                borderRadius: 4,
                backgroundColor: p.accent,
                flexShrink: 0,
              }} />
              <div>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--geyser-text)",
                  marginBottom: 6,
                }}>
                  {p.title}
                </div>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--geyser-text-muted)",
                }}>
                  {p.body}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .community-header-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .community-float-card { display: none !important; }
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
