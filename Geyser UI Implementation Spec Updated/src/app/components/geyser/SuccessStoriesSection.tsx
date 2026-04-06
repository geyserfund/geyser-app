import { motion } from "motion/react";
import { TrendingUp, ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";

const CARDS_IMG = "https://images.unsplash.com/photo-1708856034718-2c4107643f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwY2FyZHMlMjBjb2xsZWN0aWJsZXN8ZW58MXx8fHwxNzc1MDY1MDMwfDA&ixlib=rb-4.1.0&q=80&w=600";
const PERU_IMG = "https://images.unsplash.com/photo-1760726394506-855463da8979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwU291dGglMjBBbWVyaWNhJTIwY29tbXVuaXR5JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDY1MDMwfDA&ixlib=rb-4.1.0&q=80&w=600";
const SALVADOR_IMG = "https://images.unsplash.com/photo-1613188611431-858ca5252201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFbCUyMFNhbHZhZG9yJTIwdHJvcGljYWwlMjBjb21tdW5pdHklMjBjYWZlfGVufDF8fHx8MTc3NTA2NTAzMXww&ixlib=rb-4.1.0&q=80&w=600";
const AI_IMG = "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGdsb3dpbmclMjBuZXVyYWx8ZW58MXx8fHwxNzc1MDY1MDM0fDA&ixlib=rb-4.1.0&q=80&w=600";

const FOOTBALL_IMG = "https://images.unsplash.com/photo-1604325500141-ab93e7bf191d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhJTIwQWZyaWNhJTIweW91dGglMjBmb290YmFsbCUyMGNvbW11bml0eSUyMHNwb3J0c3xlbnwxfHx8fDE3NzUwNjUwMzZ8MA&ixlib=rb-4.1.0&q=80&w=400";
const AFRICA_IMG = "https://images.unsplash.com/photo-1694286067026-a8aa654481f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWFjaGVyJTIwdGVhY2hpbmclMjB3b3Jrc2hvcCUyMEFmcmljYXxlbnwxfHx8fDE3NzUwNjUwMzd8MA&ixlib=rb-4.1.0&q=80&w=400";

const featuredStories = [
  {
    id: "cards",
    category: "Collectibles",
    title: "Bitcoin Trading Cards",
    desc: "A passion project that became a cultural artifact. Trading card boxes from the campaign now trade at $30–40K each.",
    outcome: "$500,000 raised",
    img: CARDS_IMG,
    tag: "Collectibles",
    color: "#f59e0b",
    size: "large",
  },
  {
    id: "peru",
    category: "Documentary",
    title: "Peru's Bitcoin Revolution",
    desc: "Julian Figueroa brought a full documentary on Bitcoin adoption in Peru to life through micro-donations and clear funding milestones.",
    outcome: "Fully funded",
    img: PERU_IMG,
    tag: "Documentary",
    color: "#f97316",
    size: "medium",
  },
  {
    id: "btcisla",
    category: "Community",
    title: "BTC Isla — El Salvador",
    desc: "Isabella onboarded 17+ merchants, trained 25+ students, and opened a Bitcoin café — with the backing of a global community.",
    outcome: "130+ properties accepting BTC",
    img: SALVADOR_IMG,
    tag: "Community",
    color: "#34d399",
    size: "medium",
  },
  {
    id: "satoshi",
    category: "AI + Open Source",
    title: "Spirit of Satoshi",
    desc: "Aleks Svetski trained the first open-source Bitcoin AI model through a rewards-based crowdfunding campaign on Geyser.",
    outcome: "Fully funded via community",
    img: AI_IMG,
    tag: "Open Source",
    color: "#a78bfa",
    size: "large",
  },
];

const miniStories = [
  { title: "Bitcoin Ballers", subtitle: "Youth football, Nigeria", img: FOOTBALL_IMG },
  { title: "Bitcoin for Fairness", subtitle: "Anita Posch", img: AFRICA_IMG },
  { title: "Apata's Education", subtitle: "Bitcoin in Lagos", img: AFRICA_IMG },
];

function StoryCard({ story, delay }: { story: typeof featuredStories[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        border: hovered ? `1px solid ${story.color}50` : "1px solid var(--geyser-border)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 64px ${story.color}20` : "0 2px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <img
          src={story.img}
          alt={story.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }} />

        {/* Category tag */}
        <div style={{
          position: "absolute",
          top: 14,
          left: 14,
          padding: "4px 10px",
          borderRadius: 100,
          backgroundColor: `${story.color}25`,
          border: `1px solid ${story.color}50`,
          backdropFilter: "blur(8px)",
        }}>
          <span style={{
            fontFamily: "var(--geyser-font)",
            fontSize: 11,
            fontWeight: 700,
            color: story.color,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            {story.tag}
          </span>
        </div>

        {/* Outcome badge */}
        <div style={{
          position: "absolute",
          bottom: 14,
          right: 14,
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "6px 12px",
          borderRadius: 8,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${story.color}30`,
        }}>
          <TrendingUp size={12} color={story.color} />
          <span style={{
            fontFamily: "var(--geyser-font)",
            fontSize: 12,
            fontWeight: 700,
            color: "#ffffff",
          }}>
            {story.outcome}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: "20px 22px 22px",
        backgroundColor: "var(--geyser-bg)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
        <h3 style={{
          fontFamily: "var(--geyser-font)",
          fontSize: 18,
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
          color: "var(--geyser-text)",
          margin: 0,
        }}>
          {story.title}
        </h3>

        <p style={{
          fontFamily: "var(--geyser-font)",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--geyser-text-muted)",
          margin: 0,
          flex: 1,
        }}>
          {story.desc}
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: story.color,
          marginTop: 4,
        }}>
          <span style={{ fontFamily: "var(--geyser-font)", fontSize: 13, fontWeight: 600 }}>
            Read story
          </span>
          <ArrowUpRight size={13} />
        </div>
      </div>
    </motion.div>
  );
}

export function SuccessStoriesSection() {
  return (
    <section
      id="stories"
      style={{
        backgroundColor: "var(--geyser-neutral-panel)",
        padding: "100px 24px",
        borderTop: "1px solid var(--geyser-border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              fontFamily: "var(--geyser-font)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--geyser-primary-text)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Success stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--geyser-text)",
              margin: "0 0 12px",
            }}
          >
            Real creators. Real results.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--geyser-text-muted)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Each one started with a clear idea and a community ready to back it.
          </motion.p>
        </div>

        {/* Featured stories grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginBottom: 24,
        }} className="stories-grid">
          {featuredStories.map((story, i) => (
            <StoryCard key={story.id} story={story} delay={i * 0.08} />
          ))}
        </div>

        {/* Mini stories row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: 16,
          alignItems: "center",
        }} className="mini-stories-grid">
          {miniStories.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 12,
                backgroundColor: "var(--geyser-bg)",
                border: "1px solid var(--geyser-border)",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--geyser-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--geyser-border)")}
            >
              <img
                src={m.img}
                alt={m.title}
                style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
              />
              <div>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--geyser-text)",
                  marginBottom: 2,
                }}>
                  {m.title}
                </div>
                <div style={{
                  fontFamily: "var(--geyser-font)",
                  fontSize: 11,
                  color: "var(--geyser-text-muted)",
                }}>
                  {m.subtitle}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--geyser-font)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--geyser-primary-text)",
              textDecoration: "none",
              padding: "14px 18px",
              borderRadius: 12,
              backgroundColor: "var(--geyser-primary-surface)",
              border: "1px solid rgba(0,245,220,0.2)",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "rgba(0,245,220,0.14)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "var(--geyser-primary-surface)";
            }}
          >
            See all stories
            <ExternalLink size={12} />
          </motion.a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stories-grid {
            grid-template-columns: 1fr !important;
          }
          .mini-stories-grid {
            grid-template-columns: 1fr !important;
          }
          .mini-stories-grid > a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
