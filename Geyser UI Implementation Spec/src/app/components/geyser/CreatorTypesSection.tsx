import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Film, Radio, Code, Rocket, PenLine, Heart, Calendar, Zap, Video } from "lucide-react";

const FILM_IMG = "https://images.unsplash.com/photo-1758788506109-8ed33e99d3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtbWFrZXIlMjBkb2N1bWVudGFyeSUyMGNhbWVyYSUyMHNob290aW5nfGVufDF8fHx8MTc3NTA2NTAyOHww&ixlib=rb-4.1.0&q=80&w=600";
const PODCAST_IMG = "https://images.unsplash.com/photo-1668606144327-837f2d8eac94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwbWljcm9waG9uZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzUwMTU5ODJ8MA&ixlib=rb-4.1.0&q=80&w=600";
const CODE_IMG = "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwc291cmNlJTIwZGV2ZWxvcGVyJTIwY29kaW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3NTA2NTAyOXww&ixlib=rb-4.1.0&q=80&w=600";
const STARTUP_IMG = "https://images.unsplash.com/photo-1758873268933-e0765262e58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMG9mZmljZSUyMGNvbGxhYm9yYXRpb24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzUwNjUwMzZ8MA&ixlib=rb-4.1.0&q=80&w=600";
const WRITER_IMG = "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0ZXIlMjBhdXRob3IlMjBib29rJTIwd3JpdGluZyUyMGRlc2slMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NzUwNjUwMzV8MA&ixlib=rb-4.1.0&q=80&w=600";
const SOCIAL_IMG = "https://images.unsplash.com/photo-1595702700955-dbbc28a59da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBjYXVzZSUyMHByb3Rlc3QlMjBhY3RpdmlzbSUyMHBlb3BsZSUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NTA2NTAzOHww&ixlib=rb-4.1.0&q=80&w=600";
const EVENT_IMG = "https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzc3Jvb3RzJTIwY29tbXVuaXR5JTIwb3JnYW5pemluZyUyMGV2ZW50JTIwcGVvcGxlfGVufDF8fHx8MTc3NTA2NTAzMHww&ixlib=rb-4.1.0&q=80&w=600";
const CONTENT_IMG = "https://images.unsplash.com/photo-1617899516937-54fb61f7d3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHlvdXR1YmVyJTIwZmlsbWluZyUyMHNldHVwfGVufDF8fHx8MTc3NTA2NTAzNXww&ixlib=rb-4.1.0&q=80&w=600";
const AI_IMG = "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGdsb3dpbmclMjBuZXVyYWx8ZW58MXx8fHwxNzc1MDY1MDM0fDA&ixlib=rb-4.1.0&q=80&w=600";

function useInView(threshold = 0.1) {
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

const categories = [
  { name: "Filmmakers", desc: "Stories that deserve a wide audience", icon: <Film size={18} />, img: FILM_IMG, color: "#ff6b6b", size: "large" },
  { name: "Podcasters", desc: "Long-form conversations with loyal listeners", icon: <Radio size={18} />, img: PODCAST_IMG, color: "#ffd93d", size: "medium" },
  { name: "Open Source Builders", desc: "Code that belongs to everyone", icon: <Code size={18} />, img: CODE_IMG, color: "#6bcb77", size: "medium" },
  { name: "Content Creators", desc: "Videos, channels, and creative worlds", icon: <Video size={18} />, img: CONTENT_IMG, color: "#00f5dc", size: "large" },
  { name: "Startups", desc: "Early ideas finding their first community", icon: <Rocket size={18} />, img: STARTUP_IMG, color: "#a78bfa", size: "small" },
  { name: "Writers", desc: "Books, essays, journalism, and poetry", icon: <PenLine size={18} />, img: WRITER_IMG, color: "#f97316", size: "small" },
  { name: "Social Causes", desc: "Movements powered by shared conviction", icon: <Heart size={18} />, img: SOCIAL_IMG, color: "#f472b6", size: "medium" },
  { name: "Event Organizers", desc: "Gatherings that build lasting communities", icon: <Calendar size={18} />, img: EVENT_IMG, color: "#34d399", size: "small" },
  { name: "Bitcoin Communities", desc: "Builders shaping the open financial future", icon: <Zap size={18} />, img: AI_IMG, color: "#f59e0b", size: "medium" },
];

function CategoryCard({ cat, delay }: { cat: typeof categories[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: cat.size === "large" ? "4/5" : cat.size === "medium" ? "3/4" : "1/1",
        border: hovered ? `1px solid ${cat.color}50` : "1px solid var(--geyser-border)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 48px ${cat.color}25` : "none",
      }}
    >
      {/* Background image */}
      <img
        src={cat.img}
        alt={cat.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.85) 100%)`,
      }} />

      {/* Color accent overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `${cat.color}18`,
        transition: "opacity 0.3s",
        opacity: hovered ? 1 : 0,
      }} />

      {/* Content */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "20px 16px",
      }}>
        {/* Icon badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: `${cat.color}25`,
          border: `1px solid ${cat.color}40`,
          color: cat.color,
          marginBottom: 10,
        }}>
          {cat.icon}
        </div>

        <div style={{
          fontFamily: "var(--geyser-font)",
          fontSize: 15,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 4,
          lineHeight: 1.2,
        }}>
          {cat.name}
        </div>

        <div style={{
          fontFamily: "var(--geyser-font)",
          fontSize: 12,
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.4,
        }}>
          {cat.desc}
        </div>
      </div>
    </motion.div>
  );
}

export function CreatorTypesSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      style={{
        backgroundColor: "var(--geyser-neutral-panel)",
        padding: "100px 24px",
        borderTop: "1px solid var(--geyser-border)",
        borderBottom: "1px solid var(--geyser-border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div ref={ref} style={{ marginBottom: 56, maxWidth: 600 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 16 }}
          >
            <span style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--geyser-primary-text)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              Who it's for
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: "clamp(26px, 3.5vw, 42px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--geyser-text)",
              marginBottom: 16,
            }}
          >
            Every kind of creator
            <br />is welcome here
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--geyser-text-muted)",
            }}
          >
            From a filmmaker with a story to tell, to a developer building open-source tools — this is for anyone with a vision and a community to serve.
          </motion.p>
        </div>

        {/* Mosaic grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto",
          gap: 14,
        }} className="creator-grid">
          {/* Row 1 */}
          <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
            <CategoryCard cat={categories[0]} delay={0} />
          </div>
          <div style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
            <CategoryCard cat={categories[1]} delay={0.05} />
          </div>
          <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
            <CategoryCard cat={categories[2]} delay={0.1} />
          </div>
          <div style={{ gridColumn: "4 / 5", gridRow: "1 / 3" }}>
            <CategoryCard cat={categories[3]} delay={0.15} />
          </div>

          {/* Row 2 */}
          <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
            <CategoryCard cat={categories[4]} delay={0.2} />
          </div>
          <div style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
            <CategoryCard cat={categories[5]} delay={0.25} />
          </div>

          {/* Row 3 */}
          <div style={{ gridColumn: "1 / 3", gridRow: "3 / 4" }}>
            <CategoryCard cat={{ ...categories[6], size: "small" }} delay={0.3} />
          </div>
          <div style={{ gridColumn: "3 / 4", gridRow: "3 / 4" }}>
            <CategoryCard cat={categories[7]} delay={0.35} />
          </div>
          <div style={{ gridColumn: "4 / 5", gridRow: "3 / 4" }}>
            <CategoryCard cat={categories[8]} delay={0.4} />
          </div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: "center",
            marginTop: 48,
            padding: "24px",
            borderRadius: 16,
            background: "var(--geyser-primary-surface)",
            border: "1px solid rgba(0,245,220,0.15)",
          }}
        >
          <p style={{
            fontFamily: "var(--geyser-font-accent)",
            fontSize: "clamp(18px, 2vw, 24px)",
            fontStyle: "italic",
            color: "var(--geyser-text)",
            fontWeight: 400,
          }}>
            "Geyser was built for the full spectrum of creative work."
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .creator-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .creator-grid > div {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
        @media (max-width: 480px) {
          .creator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
