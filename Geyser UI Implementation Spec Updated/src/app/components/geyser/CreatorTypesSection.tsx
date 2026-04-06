import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Film, Radio, Code, Rocket, PenLine, Heart, Calendar, Zap, Video, Quote } from "lucide-react";

const FILM_IMG    = "https://images.unsplash.com/photo-1758788506109-8ed33e99d3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtbWFrZXIlMjBkb2N1bWVudGFyeSUyMGNhbWVyYSUyMHNob290aW5nfGVufDF8fHx8MTc3NTA2NTAyOHww&ixlib=rb-4.1.0&q=80&w=900";
const PODCAST_IMG = "https://images.unsplash.com/photo-1668606144327-837f2d8eac94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwbWljcm9waG9uZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzUwMTU5ODJ8MA&ixlib=rb-4.1.0&q=80&w=900";
const CODE_IMG    = "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwc291cmNlJTIwZGV2ZWxvcGVyJTIwY29kaW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3NTA2NTAyOXww&ixlib=rb-4.1.0&q=80&w=900";
const STARTUP_IMG = "https://images.unsplash.com/photo-1758873268933-e0765262e58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMG9mZmljZSUyMGNvbGxhYm9yYXRpb24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzUwNjUwMzZ8MA&ixlib=rb-4.1.0&q=80&w=900";
const WRITER_IMG  = "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0ZXIlMjBhdXRob3IlMjBib29rJTIwd3JpdGluZyUyMGRlc2slMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NzUwNjUwMzV8MA&ixlib=rb-4.1.0&q=80&w=900";
const SOCIAL_IMG  = "https://images.unsplash.com/photo-1595702700955-dbbc28a59da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBjYXVzZSUyMHByb3Rlc3QlMjBhY3RpdmlzbSUyMHBlb3BsZSUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NTA2NTAzOHww&ixlib=rb-4.1.0&q=80&w=900";
const EVENT_IMG   = "https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzc3Jvb3RzJTIwY29tbXVuaXR5JTIwb3JnYW5pemluZyUyMGV2ZW50JTIwcGVvcGxlfGVufDF8fHx8MTc3NTA2NTAzMHww&ixlib=rb-4.1.0&q=80&w=900";
const CONTENT_IMG = "https://images.unsplash.com/photo-1617899516937-54fb61f7d3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHlvdXR1YmVyJTIwZmlsbWluZyUyMHNldHVwfGVufDF8fHx8MTc3NTA2NTAzNXww&ixlib=rb-4.1.0&q=80&w=900";
const AI_IMG      = "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGdsb3dpbmclMjBuZXVyYWx8ZW58MXx8fHwxNzc1MDY1MDM0fDA&ixlib=rb-4.1.0&q=80&w=900";

const INTERVAL_MS = 5000;

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  img: string;
  shortDesc: string;
  longDesc: string;
  testimonial: { quote: string; author: string; role: string; initials: string };
  stats: string[];
}

const categories: Category[] = [
  {
    id: "filmmakers",
    name: "Filmmakers",
    icon: <Film size={16} />,
    color: "#ff6b6b",
    img: FILM_IMG,
    shortDesc: "Stories that deserve a wide audience",
    longDesc: "Filmmakers come to Geyser to fund documentaries, shorts, and features with direct community backing — keeping full creative control throughout. Every supporter becomes part of the production from the first frame.",
    testimonial: {
      quote: "Within two weeks, 200 people from 14 countries were backing my project. I had no idea there was an audience out there waiting for this story.",
      author: "Maria S.",
      role: "Documentary Filmmaker, Brazil",
      initials: "MS",
    },
    stats: ["200+ backers in 14 days", "14 countries reached", "Fully funded"],
  },
  {
    id: "podcasters",
    name: "Podcasters",
    icon: <Radio size={16} />,
    color: "#ffd93d",
    img: PODCAST_IMG,
    shortDesc: "Long-form conversations with loyal listeners",
    longDesc: "Podcasters use Geyser to fund new seasons, upgrade production, and host live events. When your listeners back the show, every episode carries the weight of that belief.",
    testimonial: {
      quote: "My listeners wanted more episodes and a way to contribute. Geyser gave them that. We funded three months of production in under two weeks.",
      author: "James T.",
      role: "Independent Podcast Host, Kenya",
      initials: "JT",
    },
    stats: ["3 months funded", "500+ listeners backed", "No ads required"],
  },
  {
    id: "opensource",
    name: "Open Source Builders",
    icon: <Code size={16} />,
    color: "#6bcb77",
    img: CODE_IMG,
    shortDesc: "Infrastructure built for everyone",
    longDesc: "Open-source developers fund their work on Geyser through communities that understand why it matters. Your contributors become stakeholders in the tools they depend on.",
    testimonial: {
      quote: "I trained the first open-source Bitcoin AI model through a Geyser campaign. The community backed the mission before a single line of code was written.",
      author: "Aleks S.",
      role: "Open Source Developer, Bitcoin Community",
      initials: "AS",
    },
    stats: ["Community-funded R&D", "Transparent milestones", "Global contributors"],
  },
  {
    id: "contentcreators",
    name: "Content Creators",
    icon: <Video size={16} />,
    color: "#00f5dc",
    img: CONTENT_IMG,
    shortDesc: "Videos, channels, and creative worlds",
    longDesc: "YouTubers, streamers, and independent media creators build sustainable channels on Geyser. Supporters fund the work directly, so the creative direction stays with the creator.",
    testimonial: {
      quote: "I spent two years building an audience before I could monetize. Geyser let me skip the ad game and fund the channel through the people who actually watch.",
      author: "Leo M.",
      role: "Independent Creator, Philippines",
      initials: "LM",
    },
    stats: ["Direct fan support", "Own your channel", "No algorithm dependency"],
  },
  {
    id: "writers",
    name: "Writers",
    icon: <PenLine size={16} />,
    color: "#fb923c",
    img: WRITER_IMG,
    shortDesc: "Books, essays, and journalism",
    longDesc: "Authors, journalists, and essayists fund their projects before publication, building a readership that's invested from the first draft. Geyser turns readers into co-creators.",
    testimonial: {
      quote: "I funded my first book before finishing the manuscript. The backers gave me deadlines, accountability, and a launch community all at once.",
      author: "Priya R.",
      role: "Author & Journalist, India",
      initials: "PR",
    },
    stats: ["Pre-launch readership", "No publisher needed", "Funded 3 months early"],
  },
  {
    id: "socialcauses",
    name: "Social Causes",
    icon: <Heart size={16} />,
    color: "#f472b6",
    img: SOCIAL_IMG,
    shortDesc: "Movements powered by shared belief",
    longDesc: "Organizers and advocates bring their causes to Geyser and find communities that share their conviction. Funding flows from genuine alignment, and momentum builds naturally from there.",
    testimonial: {
      quote: "We launched a Bitcoin education initiative for underserved communities. Supporters came from 30 countries. The funding gave the program a full year of runway.",
      author: "Anita P.",
      role: "Educator & Advocate, Africa",
      initials: "AP",
    },
    stats: ["30 countries reached", "12-month runway funded", "Ongoing supporter base"],
  },
  {
    id: "events",
    name: "Event Organizers",
    icon: <Calendar size={16} />,
    color: "#34d399",
    img: EVENT_IMG,
    shortDesc: "Gatherings that build lasting communities",
    longDesc: "Event organizers use Geyser to pre-fund meetups, conferences, and community gatherings. Tickets sell before venues are booked, because people commit to the community first.",
    testimonial: {
      quote: "We funded a sold-out Bitcoin meetup series across three cities. The campaign ran for 10 days. We're now planning the fourth city.",
      author: "Carlos V.",
      role: "Community Organizer, Mexico City",
      initials: "CV",
    },
    stats: ["3 cities, 10 days", "Sold out before launch", "Recurring community"],
  },
  {
    id: "bitcoin",
    name: "Bitcoin Communities",
    icon: <Zap size={16} />,
    color: "#f59e0b",
    img: AI_IMG,
    shortDesc: "Builders shaping the open financial future",
    longDesc: "Bitcoin developers, educators, and advocates fund their work with a community that understands why it matters. Geyser is native to the Bitcoin ecosystem — payments, culture, and values aligned.",
    testimonial: {
      quote: "Building on Bitcoin meant building with people who get it. Geyser was the only place where our campaign and our values were in the same room.",
      author: "Kofi A.",
      role: "Bitcoin Developer, Ghana",
      initials: "KA",
    },
    stats: ["Bitcoin-native payments", "Mission-aligned community", "No fiat friction"],
  },
  {
    id: "startups",
    name: "Startups",
    icon: <Rocket size={16} />,
    color: "#a78bfa",
    img: STARTUP_IMG,
    shortDesc: "Early ideas finding their first community",
    longDesc: "Early-stage founders use Geyser to validate ideas with the communities most likely to care. Backers become early adopters, and the campaign becomes the first product test.",
    testimonial: {
      quote: "We raised our first $40K from the exact users we were building for. They gave us feedback before launch that changed the product entirely.",
      author: "Yana K.",
      role: "Founder, Estonia",
      initials: "YK",
    },
    stats: ["First $40K from users", "Product feedback pre-launch", "Community-validated"],
  },
];

// Left sidebar: indices 0–3
// Right sidebar: indices 4–7
// Bottom center: index 8
// Center card: shows categories[activeIndex] with full details

const LEFT_INDICES  = [0, 1, 2, 3];
const RIGHT_INDICES = [4, 5, 6, 7];
const BOTTOM_INDEX  = 8;

function SideCard({
  cat,
  isActive,
  onClick,
  floatDelay,
}: {
  cat: Category;
  isActive: boolean;
  onClick: () => void;
  floatDelay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3.5,
        delay: floatDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "12px 14px",
          borderRadius: 14,
          backgroundColor: isActive
            ? `${cat.color}14`
            : "var(--geyser-neutral-panel)",
          border: isActive
            ? `1.5px solid ${cat.color}60`
            : "1px solid var(--geyser-border)",
          boxShadow: isActive
            ? `0 0 20px ${cat.color}22, 0 4px 16px rgba(0,0,0,0.12)`
            : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Active pulse ring */}
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{
              position: "absolute",
              top: "50%",
              left: 14,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1.5px solid ${cat.color}`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Icon */}
        <div
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: 9,
            backgroundColor: `${cat.color}20`,
            border: `1px solid ${cat.color}35`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: cat.color,
          }}
        >
          {cat.icon}
        </div>

        {/* Text */}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 13,
              fontWeight: 700,
              color: isActive ? cat.color : "var(--geyser-text)",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "color 0.3s",
            }}
          >
            {cat.name}
          </div>
          <div
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 11,
              color: "var(--geyser-text-muted)",
              lineHeight: 1.3,
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {cat.shortDesc}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BottomCard({
  cat,
  isActive,
  onClick,
}: {
  cat: Category;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 11,
          padding: "12px 20px",
          borderRadius: 14,
          backgroundColor: isActive ? `${cat.color}14` : "var(--geyser-neutral-panel)",
          border: isActive
            ? `1.5px solid ${cat.color}60`
            : "1px solid var(--geyser-border)",
          boxShadow: isActive
            ? `0 0 20px ${cat.color}22`
            : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.35s",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            backgroundColor: `${cat.color}20`,
            border: `1px solid ${cat.color}35`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: cat.color,
            flexShrink: 0,
          }}
        >
          {cat.icon}
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 13,
              fontWeight: 700,
              color: isActive ? cat.color : "var(--geyser-text)",
              transition: "color 0.3s",
            }}
          >
            {cat.name}
          </div>
          <div
            style={{
              fontFamily: "var(--geyser-font)",
              fontSize: 11,
              color: "var(--geyser-text-muted)",
              marginTop: 2,
            }}
          >
            {cat.shortDesc}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CreatorTypesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  // Auto-rotate
  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Progress animation
  useEffect(() => {
    startTimeRef.current = Date.now();
    const frame = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100));
    }, 40);
    return () => clearInterval(frame);
  }, [activeIndex]);

  const handleSideClick = (idx: number) => {
    setActiveIndex(idx);
  };

  const active = categories[activeIndex];

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

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            fontFamily: "var(--geyser-font)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--geyser-primary-text)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 14,
          }}>
            Who it's for
          </span>
          <h2 style={{
            fontFamily: "var(--geyser-font)",
            fontSize: "clamp(26px, 3.5vw, 44px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--geyser-text)",
            marginBottom: 12,
          }}>
            Every kind of creator is welcome here
          </h2>
          <p style={{
            fontFamily: "var(--geyser-font)",
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--geyser-text-muted)",
            maxWidth: 480,
            margin: "0 auto",
          }}>
            From a filmmaker with a story to tell, to a developer shipping open-source tools — this is for anyone with a vision and a community to serve.
          </p>
        </motion.div>

        {/* Main layout: sidecards + center card */}
        <div
          className="creator-main-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "190px 1fr 190px",
            gap: 20,
            alignItems: "center",
          }}
        >
          {/* Left sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LEFT_INDICES.map((catIdx, i) => (
              <SideCard
                key={categories[catIdx].id}
                cat={categories[catIdx]}
                isActive={activeIndex === catIdx}
                onClick={() => handleSideClick(catIdx)}
                floatDelay={i * 0.4}
              />
            ))}
          </div>

          {/* Center big card */}
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              position: "relative",
              minHeight: 480,
              border: "1px solid var(--geyser-border)",
              boxShadow: `0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px ${active.color}18`,
              transition: "box-shadow 0.5s ease",
            }}
          >
            {/* Background image — transitions with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`img-${activeIndex}`}
                src={active.img}
                alt={active.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 30%",
                }}
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.92) 100%)",
            }} />

            {/* Color tint overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tint-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 30% 80%, ${active.color}22 0%, transparent 60%)`,
                }}
              />
            </AnimatePresence>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "28px 32px 0" }}>

              {/* Top: category badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${activeIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: `${active.color}22`,
                    border: `1px solid ${active.color}55`,
                    borderRadius: 100,
                    padding: "6px 14px",
                    width: "fit-content",
                    backdropFilter: "blur(8px)",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ color: active.color }}>{active.icon}</span>
                  <span style={{
                    fontFamily: "var(--geyser-font)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: active.color,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    {active.name}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Bottom content block */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeIndex}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {/* Title */}
                  <h3 style={{
                    fontFamily: "var(--geyser-font)",
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    marginBottom: 10,
                  }}>
                    {active.name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "var(--geyser-font)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.72)",
                    marginBottom: 20,
                    maxWidth: 520,
                  }}>
                    {active.longDesc}
                  </p>

                  {/* Stats chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                    {active.stats.map((stat) => (
                      <span
                        key={stat}
                        style={{
                          fontFamily: "var(--geyser-font)",
                          fontSize: 11,
                          fontWeight: 600,
                          color: active.color,
                          backgroundColor: `${active.color}18`,
                          border: `1px solid ${active.color}40`,
                          borderRadius: 100,
                          padding: "4px 12px",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    marginBottom: 20,
                  }} />

                  {/* Testimonial */}
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 0 }}>
                    {/* Initials avatar */}
                    <div style={{
                      flexShrink: 0,
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      backgroundColor: `${active.color}30`,
                      border: `1.5px solid ${active.color}60`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--geyser-font)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: active.color,
                      marginTop: 2,
                    }}>
                      {active.testimonial.initials}
                    </div>

                    <div style={{ flex: 1 }}>
                      <Quote size={14} style={{ color: active.color, opacity: 0.7, marginBottom: 6 }} />
                      <p style={{
                        fontFamily: "var(--geyser-font-accent)",
                        fontSize: 15,
                        fontStyle: "italic",
                        lineHeight: 1.55,
                        color: "rgba(255,255,255,0.88)",
                        margin: "0 0 8px",
                        fontWeight: 300,
                      }}>
                        "{active.testimonial.quote}"
                      </p>
                      <div style={{
                        fontFamily: "var(--geyser-font)",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.55)",
                      }}>
                        {active.testimonial.author} · {active.testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div style={{
                marginTop: 24,
                height: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
              }}>
                <motion.div
                  key={`progress-${activeIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.08, ease: "linear" }}
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    backgroundColor: active.color,
                  }}
                />
              </div>

              {/* Dots indicator */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 6,
                padding: "14px 0 20px",
              }}>
                {categories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSideClick(i)}
                    style={{
                      width: i === activeIndex ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: i === activeIndex ? active.color : "rgba(255,255,255,0.25)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {RIGHT_INDICES.map((catIdx, i) => (
              <SideCard
                key={categories[catIdx].id}
                cat={categories[catIdx]}
                isActive={activeIndex === catIdx}
                onClick={() => handleSideClick(catIdx)}
                floatDelay={i * 0.4 + 0.2}
              />
            ))}
          </div>
        </div>

        {/* Bottom center card */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <BottomCard
            cat={categories[BOTTOM_INDEX]}
            isActive={activeIndex === BOTTOM_INDEX}
            onClick={() => handleSideClick(BOTTOM_INDEX)}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .creator-main-layout {
            grid-template-columns: 1fr !important;
          }
          .creator-main-layout > div:first-child,
          .creator-main-layout > div:last-child {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 540px) {
          .creator-main-layout > div:first-child,
          .creator-main-layout > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
