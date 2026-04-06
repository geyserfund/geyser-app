import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, ArrowUpRight } from "lucide-react";

const VIDEO_THUMB = "https://images.unsplash.com/photo-1773777166215-ffb246c73e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvbW11bml0eSUyMHdvcmtzaG9wJTIwcGVvcGxlJTIwY29sbGFib3JhdGlvbiUyMHdhcm18ZW58MXx8fHwxNzc1MDY1MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function WelcomeSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "var(--geyser-bg)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          <span style={{
            fontFamily: "var(--geyser-font-accent)",
            fontSize: 18,
            fontStyle: "italic",
            color: "var(--geyser-primary-text)",
          }}>
            Built around creators
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--geyser-font)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--geyser-text)",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Welcome to Geyser
        </motion.h2>

        {/* Content layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }} className="welcome-grid">

          {/* Video block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "16/10",
                cursor: "pointer",
                boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
                border: "1px solid var(--geyser-border)",
              }}
              role="button"
              aria-label="Play Geyser introduction video"
            >
              <img
                src={VIDEO_THUMB}
                alt="Geyser community gathering"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 100%)",
              }} />

              {/* Play button */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    backgroundColor: "#00f5dc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(0,245,220,0.45)",
                  }}
                >
                  <Play size={28} color="#007b6c" fill="#007b6c" style={{ marginLeft: 4 }} />
                </motion.div>
              </div>

              {/* Caption overlay */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 24px",
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              }}>
                <span style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.8)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}>
                  Our story • 3 min
                </span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{
              display: "inline-block",
              backgroundColor: "var(--geyser-primary-surface)",
              border: "1px solid rgba(0,245,220,0.2)",
              borderRadius: 8,
              padding: "4px 12px",
              marginBottom: 20,
            }}>
              <span style={{
                fontFamily: "var(--geyser-font)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--geyser-primary-text)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                Our mission
              </span>
            </div>

            <p style={{
              fontFamily: "var(--geyser-font-accent)",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontStyle: "italic",
              lineHeight: 1.4,
              color: "var(--geyser-text)",
              marginBottom: 24,
              fontWeight: 400,
            }}>
              "Every great project begins with people who believe in it."
            </p>

            <p style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--geyser-text-muted)",
              marginBottom: 16,
            }}>
              Educators, artists, open-source builders, event organizers, and storytellers bring their work to Geyser. Each one arrived with a vision and found a community ready to get behind it.
            </p>

            <p style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--geyser-text-muted)",
              marginBottom: 32,
            }}>
              Geyser connects creators with people who care about what they're building. Support flows from genuine belief, and it carries projects further than the creator could go alone.
            </p>

            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--geyser-font)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--geyser-primary-text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--geyser-primary-text)",
                paddingBottom: 2,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              See how it works
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .welcome-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
